JustDive.SyncedResourceController = JustDive.AbstractResourceController.extend({
	
	init: function() {
		this._super();
		console.log('ici');
		console.log(this.resourceType.resourceLocalAdapter);
		console.log('ici2');
		//this._resourceRequest = this.resourceType.get('resourceLocalAdapter')._resourceRequest;
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
		return JustDive.resourceAdapters.local._fail("Unable to find '" + id + "' in local data");
	}
});