JustDive.resourceAdapters.remote = JustDive.CoreObject.create({
	request: function(params) {
		if (!params.headers) {
			params.headers = {};
		}
		params.headers['X-CSRF-Token'] = JustDive.identity.get('authenticity_token');
		return jQuery.ajax(params);
	}
});