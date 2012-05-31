if (JustDive.ResourceAdapters === undefined) JustDive.ResourceAdapters = {};

JustDive.ResourceAdapters.Remote = JustDive.CoreObject.extend({

	_resourceRequest: function(params) {
		params.dataType = 'json';
		if (params.url === undefined) {
			params.url = this._resourceUrl();
		}
		if (this._prepareResourceRequest !== undefined) {
			this._prepareResourceRequest(params);
		}
	  
		return this._request(params);
    },

	_request: function(params) {
		if (!params.headers) {
			params.headers = {};
		}
		params.headers['X-CSRF-Token'] = JustDive.identity.get('authenticity_token');
		return jQuery.ajax(params);
	}
});