JustDive.SyncCue = JustDive.Object.extend({
	store_id: 'sync_cue',
	data: null,
	allowed_requests: ["POST", "PUT", "DELETE"],
	is_monitored: false,
	is_processing: false,
	pid: null,

	pushRequest: function(params, json, old_data) {
		if (params.type !== undefined) {
			params.type = params.type.toUpperCase();
		}
		if (this.allowed_requests.indexOf(params.type) < 0) {
			return false;
		}
		var url_parts = params.url.split('/');
		if (url_parts[0] == "") {
			url_parts.splice(0, 1);
		}
		var store_id = url_parts[0],
			object_type,
			new_data = null;

		object_type = store_id.substring(0, store_id.length - 1);
		if ((params.type === "POST") || (params.type === "PUT")) { // CREATE or UPDATE
			new_data = json;
		}

		var entry = JustDive.CoreObject.create({
			timestamp: new Date(),
			type: params.type,
			resource: store_id.substring(0, store_id.length - 1),
			url: params.url,
			store: store_id,
			old_data: old_data,
			new_data: new_data
		});
		this._init();
		this.data.push(entry);
		this._save();
	}, 
	
	getRequests: function() {
		this._init();
		//console.log(this.data);
		return this.data;
	},
	
	startMonitoring: function() {
		var cue = this;
		cue.set('pid', setInterval(function () {
			cue.process();
		}, 5000));
		this.set('is_monitored', true);
	},
	
	stopMonitoring: function() {
		var cue = this;
		clearInterval(cue.get('pid'));
		cue.set('is_monitored', false);
		cue.set('is_processing', false);
		cue.set('pid', null);
	},

	process: function() {
		var cue = this;
		if ((!cue.get('is_processing')) && (cue.getRequests().length > 0)) {
			//cue.optimize(); remove useless requests, merge, ...
			// On analyse la suite de la pile pour voir si la donnée a été modifiée par la suite;
			var requests = cue.getRequests().reverse();
			var request = requests.pop();
			var params = {
				dataType: 	'json',
				type:		request.type,
				url:		request.url
			};
			cue.set('is_processing', true);
			switch (request.type) {
				case 'POST':
							var local_id = request.new_data.id;
							request.new_data.id = null;
							params.data = {};
							params.data[request.resource] = request.new_data;						
							JustDive.resourceAdapters.remote.request(params)
								.done(function(json) {
									// TODO : On met à jour la donnée avec les infos reçues (id / updated_at / created_at);
									JustDive.controllers[request.store].updateLocalObject(local_id, json, true)
										.done(function() {
											cue._saveAndContinue();
										})
										.fail(function(error) {
											alert('ko');
											console.log(error);
										})
								})
								.fail(function(error) {
									alert('ko');
									console.log(error);
								});
							break;
				case 'PUT':
							/*
							On met à jour la donnée avec les infos reçues
							*/
							params.type = 'GET';
							JustDive.resourceAdapters.remote.request(params)
								.done(function(json) {
									if (request.old_data.updated_at === json.updated_at) { // On vérifie que OLD_DATA correspond à l'objet sur le serveur
										params.type = 'PUT';
										delete request.new_data['id'];
										delete request.new_data['created_at'];
										delete request.new_data['updated_at'];
										params.data = {};
										params.data[request.resource] = request.new_data;
										JustDive.resourceAdapters.remote.request(params) // On propoge l'objet;
											.done(function(json) {
												console.log('This comes from the server');
												console.log(json);
												// TODO : On met à jour la donnée avec les infos reçues (id / updated_at / created_at);
												JustDive.controllers[request.store].updateLocalObject(json.id, json)
													.done(function() {
														cue._saveAndContinue();
													})
													.fail(function(error) {
														alert('ko');
														console.log(error);
													})
											})
											.fail(function(error) {
												alert('ko');
												console.log(error);
												cue._saveAndContinue();
											});
									} else {
										alert('ko');
										console.log('Ooops, you must choose which version to keep');
										cue._saveAndContinue();
									}
								})
								.fail(function(error) {
									alert('ko');
									console.log(error);
								});
							//cue._saveAndContinue();
							break;
				case 'DELETE':					
							JustDive.resourceAdapters.remote.request(params)
								.done(function(json) {
									cue._saveAndContinue();
								})
								.fail(function(e) {
									if (e.status !== 404) {
										JustDive.displayError('jqXHR', e);
									} else {
										cue._saveAndContinue();
									}
								});
							break;
			}
		}
	},
	
	_saveAndContinue: function() {
		var cue = this;
		cue._save();
		cue.set('is_processing', false);
		cue.process(); // Forwards to the next request
	},
	
	_init: function() {
		serialized_data = localStorage.getItem(this.store_id)
		this.data = (serialized_data && JSON.parse(serialized_data)) || [];
	},

	_save: function() {
		if (this.data && this.store_id) {
			var serialize_data = JSON.stringify(this.data);
			localStorage.setItem(this.store_id, serialize_data);
			return true;
		} else {
			return false;
		}
	}
});