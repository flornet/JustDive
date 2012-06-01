#= require ../adapter.js

JustDive.Resource.Adapter.Remote = Ember.Mixin.create({

	_resourceRequest: function(params) {
		params.dataType = 'json';
		if (params.url === undefined) {
			params.url = this._resourceUrl();
		}
		if (this._prepareResourceRequest !== undefined) {
			this._prepareResourceRequest(params);
		}
	  
		return this._requestRemote(params);
    },

	_requestRemote: function(params) {
		if (!params.headers) {
			params.headers = {};
		}
		params.headers['X-CSRF-Token'] = JustDive.identity.get('authenticity_token');
		return jQuery.ajax(params);
	}
});