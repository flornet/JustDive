JustDive.resourceAdapters.remote = JustDive.CoreObject.create({
	request: function(params) {
		return jQuery.ajax(params);
	}
});