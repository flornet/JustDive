#= require ./abstract.js
JustDive.Resource.Synced = JustDive.Resource.Abstract.extend(JustDive.Resource.Adapter.Synced, {
	
	updateResourceLocal: function(force_id_update) {
		var self = this,
			url;
		if (force_id_update !== true) {
			force_id_update = false;
		}
		if (self.get('local_id') !== undefined) {
			url = self.resourceUrl + '/' + self.get('local_id');
			self.set('local_id', null);
		} else {
			url = self._resourceUrl();
		}
		return self._resourceRequest({type: 'PUT',
									  url: url,
									  force_id_update: force_id_update,
									  data: self.serialize() }, false)
		  .done(function(json) {
			// Update properties
			if (json) self.deserialize(json);
		  });
  }
});