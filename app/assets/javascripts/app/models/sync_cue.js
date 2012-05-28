JustDive.syncCue = JustDive.CoreObject.create({
	store_id: 'sync_cue',
	data: null,
	allowed_requests: ["POST", "PUT", "DELETE"],
	is_monitored: false,

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
		console.log(this.data);
		return this.data;
	},
	
	startMonitoring: function() {
		var cue = this;
		cue.set('is_monitored', true);
		while(cue.get('is_monitored')) {
			if ((cue.getRequests().length > 0) && (!cue.get('is_processing_request'))) {
				console.log('cue is not empty');
				cue.set('is_processing_request', true);
			} else {
				console.log('cue is empty or processing request');
			}
		}
	},
	
	stopMonitoring: function() {
		var cue = this;
		cue.set('is_monitored', false);
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