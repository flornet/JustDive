#= require ./abstract.js
#= require ../adapter/synced.js
JustDive.Resource.Controller.Synced = JustDive.Resource.Controller.Abstract.extend(JustDive.Resource.Adapter.Synced, {
	
	isSynchronizable: true,
	
	getDataSync: function() {
		return JustDive.dataSync;
	},
	
	diffSynchronize: function() {
		var self = this;
		self.findDiffRemote()
			.done(function(json) {
				var created = json.created,
					updated = json.updated;
				
				// Dealing with created data
				var length 	= created.length,
					saved 	= 0,
					failed 	= 0;
				created.forEach(function(resource) {
					console.log('Created');
				});
				
				// Dealing with updated data
				var length 	= updated.length,
					saved 	= 0,
					failed 	= 0;
				updated.forEach(function(resource) {
					self.updateLocalObject(resource.id, resource, false)
							.done(function() {
								saved += 1;
							})
							.fail(function(error) {
								failed += 1;
								JustDive.displayError('jqXHR', error);
							})
							.always( function() {
								if ((saved + failed) == length) {
									self.getDataSync().markAsSynced(self._resourceStoreId());
								}
							});
				});
				
				/*
				var length 	= json.length;
				var saved 	= 0;
				var failed 	= 0;
				json.forEach(function(resource) {
					console.log(resource);
				});*/
			})
			.fail(function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},
	
	firstSynchronize: function() {
		/* First time:
		 * - Loads remote data,
		 * - Save them to local storage,
		 * - Add an entry to the sync_local_history and sync_remote_history
		 */
		var self = this;
		self.findAllRemote()
			.done(function() {
				var length 	= self.get('length'),
					saved 	= 0,
					failed 	= 0;
				self.get('content').forEach(function(resource) {
					resource.saveResourceLocal()
						.done( function() {
							saved += 1;
						})
						.fail( function(e) {
							failed += 1;
							JustDive.displayError('jqXHR', e);
						})
						.always( function() {
							if ((saved + failed) == length) {
								self.getDataSync().markAsSynced(self._resourceStoreId());
							}
						});
				});
			})
			.fail(function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},
	
	findAllRemote: function() {
		var self = this,
			params = {
				dataType: 	'json',
				type: 		'GET'
			};
		if (params.url === undefined) {
			params.url = this._resourceUrl();
		}
		return this._requestRemote(params)
		  .done(function(json) {
			self.clearAll();
			self.loadAll(json);
		  });
	},
	
	findDiffRemote: function() {
		var self = this,
			params = {
				dataType: 	'json',
				type: 		'GET',
				url:		this._resourceUrl() + '/diff'
			};
		return this._requestRemote(params);
	},
	
	updateLocalObject: function(id, data, force_id_update) {
		if (force_id_update !== true) {
			force_id_update = false;
		}
		var loc = this.get('length') || 0;
		while(--loc >= 0) {
		  var curObject = this.objectAt(loc) ;
		  if (curObject.id.toString() === id.toString()) {
			if (force_id_update === true) {
				curObject.set('local_id', local_id);
			}
			for (var key in data) {
				curObject.set(key, data[key]);
			}
			return curObject.updateResourceLocal(force_id_update);
		  }
		}
		return this._fail("Unable to find '" + id + "' in local data");
	},
		
	_resourceStoreId: function() {
		var url_parts = this._resourceUrl().split('/');
		if (url_parts[0] == "") {
			url_parts.splice(0, 1);
		}
		return url_parts[0];
	}
});