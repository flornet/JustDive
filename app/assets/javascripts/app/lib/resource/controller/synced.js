#= require ./abstract.js
#= require ../adapter/synced.js
JustDive.Resource.Controller.Synced = JustDive.Resource.Controller.Abstract.extend(JustDive.Resource.Adapter.Synced, {
	
	isSynchronizable: true,
	
	init: function() {
		this._super();
		this.findAll();
	},
	
	getDataSync: function() {
		return JustDive.dataSync;
	},
	
	diffSynchronize: function() {
		var self = this;
		//TODO: handle deleted data
		self.findDiffRemote()
			.done(function(json) {
				var created = json.created,
					updated = json.updated,
					deleted = json.deleted;
				if (created.length + updated.length + deleted.length === 0) {
					self.getDataSync().isUpToDate(self._resourceStoreId());
				} else {
					if (created.length > 0) {
						// Dealing with created data
						var length 	= created.length,
							saved 	= 0,
							failed 	= 0;
						created.forEach(function(jsonResource) {
							var resource = self.get('resourceType').create().deserialize(jsonResource);
							resource.saveResourceLocal()
								.done( function() {
									saved += 1;
									self.pushObject(resource);
								})
								.fail( function(e) {
									failed += 1;
									JustDive.displayError('jqXHR', e);
								})
								.always( function() {
									if ((saved + failed) == length) {
										console.log('Dealing with created data: finished');
										if (updated.length > 0) {
											self.processUpdatedObjects(updated, deleted);
										} else {
											self.getDataSync().markAsSynced(self._resourceStoreId());
										}
									}
								});
						});
					} else {
						if (updated.length > 0) {
							self.processUpdatedObjects(updated, deleted);
						} else {
							self.processDeletedObjects(deleted);
						}
					}
				}
			})
			.fail(function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},
	
	processUpdatedObjects: function(updated, deleted) {
		var self = this;
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
							console.log('Dealing with updated data: finished');
							if (deleted.length > 0) {
								self.processDeletedObjects(deleted);
							} else {
								self.getDataSync().markAsSynced(self._resourceStoreId());
							}
						}
					});
		});
	},
	
	processDeletedObjects: function(deleted) {
		var self = this;
		// Dealing with deleted data
		var length 	= deleted.length,
			saved 	= 0,
			failed 	= 0;
		deleted.forEach(function(resourceId) {
			var resource = self.findObject(resourceId);
			resource.deleteResourceLocal()
					.done(function() {
						self.removeObject(resource);
						saved += 1;
					})
					.fail(function(error) {
						failed += 1;
						JustDive.displayError('jqXHR', error);
					})
					.always( function() {
						if ((saved + failed) == length) {
							console.log('Dealing with deleted data: finished');
							self.getDataSync().markAsSynced(self._resourceStoreId());
						}
					});
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
				if (length === 0) { // Empty store
					self.getDataSync().markAsSynced(self._resourceStoreId());
				} else {
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
				}
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
			},
			loc = this.get('length') || 0,
			entries = new Array();
		
		while(--loc >= 0) {
			var curObject = this.objectAt(loc) ;
			entries.push(curObject.id);
		}
		params.data = {'entries': entries};
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
				curObject.set('local_id', id);
			}
			for (var key in data) {
				curObject.set(key, data[key]);
			}
			return curObject.updateResourceLocal(force_id_update);
		  }
		}
		return this._fail("Unable to find '" + id + "' in local data");
	},
	
	findObject: function(id) {
		var loc = this.get('length') || 0;
		while(--loc >= 0) {
		  var curObject = this.objectAt(loc) ;
		  if (curObject.id.toString() === id.toString()) {
			return curObject;
		  }
		}
		return false;
	},
		
	_resourceStoreId: function() {
		var url_parts = this._resourceUrl().split('/');
		if (url_parts[0] == "") {
			url_parts.splice(0, 1);
		}
		return url_parts[0];
	}
});