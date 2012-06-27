#= require ../adapter.js
#= require ./remote.js
#= require ./local.js

JustDive.Resource.Adapter.Synced = Ember.Mixin.create(JustDive.Resource.Adapter.Local, JustDive.Resource.Adapter.Remote, {
	getSyncCue: function() {
		return JustDive.syncCue;
	},
	
    _resourceRequest: function(params, addToSyncCue) {
		var syncCue = this.getSyncCue();
		if (addToSyncCue !== false) {
			addToSyncCue = true;
		}
		
		params.dataType = 'json';
		if (params.url === undefined) {
			params.url = this._resourceUrl();
		}
		if (this._prepareResourceRequest !== undefined) {
			this._prepareResourceRequest(params);
		}
		/*
		console.log(params);
		console.log(addToSyncCue);
		if (params.type !== 'GET')
			return false;
		*/
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
	},
	
	updateResourceLocal: function(force_id_update) {
		var self = this,
			url,
			params;
		if (force_id_update !== true) {
			force_id_update = false;
		}
		if ((self.get('local_id') !== undefined) && (self.get('local_id') !== null))  {
			url = self.resourceUrl + '/' + self.get('local_id');
			self.set('local_id', null);
		} else {
			url = self._resourceUrl();
		}
		params = {
					type: 				'PUT',
					url: 				url,
					force_id_update: 	force_id_update,
					data: 				self.serialize() 
				};
		return self._resourceRequest(params, false)
					  .done(function(json) {
						// Update properties
						if (json) self.deserialize(json);
					  });
	},
	
	deleteResourceLocal: function() {
		return this._resourceRequest({type: 'DELETE'}, false);
	}
});