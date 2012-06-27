#= require ./abstract.js
#= require ../adapter/local.js
JustDive.Resource.Controller.Local = JustDive.Resource.Controller.Abstract.extend(JustDive.Resource.Adapter.Local, {
	deleteAllLocal: function() {
		var self = this,
			params = {
				dataType: 	'json',
				type: 		'PURGE'
			};
		if (params.url === undefined) {
			params.url = this._resourceUrl();
		}
		return this._requestLocal(params);
	},
});