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
    },
	
	saveResourceLocal: function() {
		var self = this;

		if (this.validate !== undefined) {
		  var error = this.validate();
		  if (error) {
			return {
			  fail: function(f) { f(error); return this; },
			  done: function() { return this; },
			  always: function(f) { f(); return this; }
			};
		  }
		}
		return this._resourceRequest({type: this.isNew() ? 'POST' : 'PUT',
									  data: this.serialize(),
									  force_id_create: true}, false)
		  .done(function(json) {
			// Update properties
			if (json) self.deserialize(json);
		});
	}
});