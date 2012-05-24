Ember.ResourceAdapter = Ember.Mixin.create({
    _resourceRequest: function(params) {
      params.url = this._resourceUrl();
      params.dataType = 'json';

      if (this._prepareResourceRequest !== undefined) {
        this._prepareResourceRequest(params);
      }

	  //console.log(this._remoteRequest(params));
	  //return this._localRequest(params);
      return this._remoteRequest(params);
    },
	
	_localRequest: function(params) {
		return JustDive.resourceAdapters.local.request(params);
	},
	
	_remoteRequest: function(params) {
		return JustDive.resourceAdapters.remote.request(params);
	}
});