#= require ../models.js
#= require ../lib/resource/local.js

JustDive.Models.SyncLocalHistory = JustDive.Resource.Local.extend({
	resourceUrl: 		'/sync_histories',
	resourceName:       'sync_history',
	resourceProperties: [
							'id', 
							'resource_name',
							'created_at'
						]
});
