#= require ../models.js
#= require ../lib/resource/local.js

JustDive.Models.SyncLocalHistory = JustDive.Resource.Local.extend({
	resourceUrl: 		'/sync_local_histories',
	resourceName:       'sync_local_history',
	resourceProperties: [
							'id', 
							'resource_name',
							'created_at'
						]
});
