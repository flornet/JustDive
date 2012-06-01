#= require ../models.js
#= require ../lib/resource/local.js

JustDive.Models.SyncLocalHistory = JustDive.Resource.Local.extend({
	resourceUrl: 		'/divers',
	resourceName:       'diver',
	resourceProperties: [
							'id', 
							'resource_name', 
							'created_at'
						]
});
