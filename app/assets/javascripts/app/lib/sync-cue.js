#= require ./resource/adapter/local.js
#= require ./resource/adapter/remote.js

JustDive.SyncCue = JustDive.Object.extend(JustDive.Resource.Adapter.Local, JustDive.Resource.Adapter.Remote, {
	store_id: 				'sync_cue',
	data: 					null,
	allowed_requests: 		["POST", "PUT", "DELETE"],
	is_monitored: 			false,
	is_processing: 			false,
	pid: 					null,
	dontSendToRemote: 	[
							'id',
							'created_at',
							'updated_at'
						],
	processingFrequency: 	5000,

	getControllers: function() {
		return JustDive.restControllers;
	},
	
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
		return this.data;
	},

	process: function() {
		var cue = this;
		cue._optimize();
		
		if ((!cue.get('is_processing')) && (cue.getRequests().length > 0)) {
			cue.set('is_processing', true);
			var controller,
				params;
			
			var request = cue.getRequests().shift(); 	// gets the request
			cue.getRequests().unshift(request);			// replace it in the stack (since not done yet)

			controller 	= cue.getControllers()[request.store],
			params 		= {
								dataType: 	'json',
								type:		request.type,
								url:		request.url
							};
			switch (request.type) {
				case 'POST':
							var local_id = request.new_data.id;
							request.new_data = cue._filterProperties(request.new_data);
							params.data = {};
							params.data[request.resource] = request.new_data;						
							cue._requestRemote(params)
								.done(function(json) {
									controller.updateLocalObject(local_id, json, true)
										.done(function() {
											// Getting the ID of the created entry en replacing IDs in the cue with this one
											cue._propagateNewId(local_id, json.id);
											
											cue._saveAndContinue();
										})
										.fail(function(error) {
											JustDive.displayError('jqXHR', error);
										})
								})
								.fail(function(error) {
									JustDive.displayError('jqXHR', error);
								});
							break;
				case 'PUT':
							
							// On vérifie que OLD_DATA correspond à l'objet sur le serveur
							params.type = 'GET';
							cue._requestRemote(params)
								.done(function(json) {
									if (request.old_data.updated_at === json.updated_at) { 
										// On propoge l'objet;
										params.type = 'PUT';
										request.new_data = cue._filterProperties(request.new_data);
										params.data = {};
										params.data[request.resource] = request.new_data;
										cue._requestRemote(params) 
											.done(function(json) {
												// On met à jour la donnée avec les infos reçues
												controller.updateLocalObject(json.id, json)
													.done(function() {
														cue._saveAndContinue();
													})
													.fail(function(error) {
														JustDive.displayError('jqXHR', error);
													})
											})
											.fail(function(error) {
												JustDive.displayError('jqXHR', error);
												//cue._saveAndContinue();
											});
									} else {
										//JustDive.ui.showConfirmation()
										alert('Ooops, you must choose which version to keep');
										console.log('We chose to update the local data with the remote data received');
										controller.updateLocalObject(json.id, json)
											.done(function() {
												cue._saveAndContinue();
											})
											.fail(function(error) {
												JustDive.displayError('jqXHR', error);
											})
									}
								})
								.fail(function(error) {
									JustDive.displayError('jqXHR', error);
								});
							//cue._saveAndContinue();
							break;
				case 'DELETE':					
							cue._requestRemote(params)
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
	
	_optimize: function() {
		var originalRequests = this.getRequests(),
			newRequests = [],
			createRequests = {},
			updateRequests = {},
			deleteRequests = {};
		
		// Sorting requests CREATE | UPDATE | DELETE
		for (var i=0 ; i < originalRequests.length ; i++) {
			var request = originalRequests[i],
				key = request.resource + ':'; // ie.: "dive_event:a166287d-2d2a-7bcd-f9b6-fe03cf6871c7"
			if (request.new_data !== null) {
				key += request.new_data.id;
			} else {
				key += request.old_data.id;
			}
			
			switch (request.type) {
				case "POST":
							createRequests[key] = request;
							break;
				case "PUT":
							updateRequests[key] = request; // Flattening multiple updates
							break;
				case "DELETE":
							deleteRequests[key] = request;
							break;
			}
		}
		
		// Cycle through DELETE requests to remove CREATE | UPDATE requests related
		for (key in deleteRequests) {
			if ((createRequests[key] === undefined) && (updateRequests[key] === undefined)) {
				// Deleting something that wasn't CREATED or UPDATED right now, let's keep the DELETE request
				newRequests.push(deleteRequests[key]);
			} else {
				delete createRequests[key];
				delete updateRequests[key];
			}
		}
		
		// Cycle through UPDATE requests to merge CREATE requests related
		for (key in updateRequests) {
			if (createRequests[key] === undefined) {
				// Updating something that wasn't CREATED right now, let's keep the UPDATE request
				newRequests.push(updateRequests[key]);
			} else {
				// Updating something that was just CREATED, let's merge
				createRequests[key].new_data = updateRequests[key].new_data;
			}
		}
		
		newRequests = newRequests.reverse();
		
		// Cycle through CREATE requests to append remaining CREATE requests
		for (key in createRequests) {
			newRequests.push(createRequests[key]);
		}
				
		this.data = newRequests;
		this._save();
	},
	
	_propagateNewId: function(oldId, newId) {
		var originalRequests = this.getRequests(),
			newRequests = [];
		for (var i=0 ; i < originalRequests.length ; i++) {
			var request = originalRequests[i];
			if ((request.new_data !== undefined) && (request.new_data !== null)) {
				for (dataKey in request.new_data) {
					if (request.new_data[dataKey].toString() === oldId.toString()) {
						request.new_data[dataKey] = newId;
					}
				}
			}
			if ((request.old_data !== undefined) && (request.old_data !== null)) {
				for (dataKey in request.old_data) {
					if (request.old_data[dataKey].toString() === oldId.toString()) {
						request.old_data[dataKey] = newId;
					}
				}
			}
			newRequests.push(request);
		}
		this.data = newRequests;
		this._save();
	},
	
	_filterProperties: function(data) {
		var cue = this;
		for (property in cue.dontSendToRemote) {
			delete data[cue.dontSendToRemote[property]];
		}
		return data;
	},
	
	_saveAndContinue: function() {
		var cue = this;
		cue.getRequests().shift(); // Removes the first request (since it ended OK)
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