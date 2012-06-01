#= require ../adapter.js
#= require ./remote.js
#= require ./local.js

JustDive.Resource.Adapter.Synced = Ember.Mixin.create(JustDive.Resource.Adapter.Local, JustDive.Resource.Adapter.Remote, {
	syncCueBinding: 				"JustDive.syncCue",
	
    _resourceRequest: function(params, addToSyncCue) {
		var syncCue = this.syncCue;
		if (addToSyncCue === undefined) {
			addToSyncCue = true;
		}
		
		params.dataType = 'json';
		if (params.url === undefined) {
			params.url = this._resourceUrl();
		}
		if (this._prepareResourceRequest !== undefined) {
			this._prepareResourceRequest(params);
		}
		
		return this._requestLocal(params)
					.done(function(json, old_data) {
						//console.log('Local request ok');
						if (addToSyncCue) {
							//console.log('Adding to sync cue');
							syncCue.pushRequest(params, json, old_data);
						}
					});
    }	
});