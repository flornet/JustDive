#= require ./abstract.js
#= require ../adapter/synced.js
JustDive.Resource.Controller.Synced = JustDive.Resource.Controller.Abstract.extend(JustDive.Resource.Adapter.Synced, {
	
	isSynchronizable: true,
	
	_resourceStoreId: function() {
		var url_parts = this._resourceUrl().split('/');
		if (url_parts[0] == "") {
			url_parts.splice(0, 1);
		}
		return url_parts[0];
	},
	
	synchronize: function() {
		/* First time:
		 * - Loads remote data,
		 * - Save them to local storage,
		 * - Add an entry to the sync_local_history and sync_remote_history
		 */
		var self = this;
		self.findAllRemote()
			.done(function() {
				var length 	= self.get('length');
				var saved 	= 0;
				var failed 	= 0;
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
								console.log('ici');
								var syncEntry = JustDive.Models.SyncLocalHistory.create({
																							resource_name: 	self._resourceStoreId(), 
																							created_at: 	new Date()
																						});
								syncEntry.saveResource()
									.done(function (json) {
										// TODO: REMOTE > sync_remote_history
									})
									.fail(function(e) {
										JustDive.displayError('jqXHR', e);
									});
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
	}
});