#= require ../rest.js
#= require ../../lib/resource/controller/local.js

JustDive.Controllers.Rest.SyncLocalHistories = JustDive.Resource.Controller.Local.extend({
	resourceType: JustDive.Models.SyncLocalHistory,
  
	isInitialized: function() {
		var self 	= this,
			params 	= {
						type: 		'GET', 
						dataType: 	'json',
						url: 		self._resourceUrl()
					},
			result = false;
		
		self._initLocalAdapter(params);
		
		// Converts to Array
		var data = [];
		for (entry in self.data){
			data.push(self.data[entry]);
		}

		if (data.length === 0) {
			result = false;
		} else {
			result = true;
		}

		return result;
	}
});