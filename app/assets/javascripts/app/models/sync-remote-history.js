#= require ../models.js
#= require ../lib/resource/remote.js

JustDive.Models.SyncRemoteHistory = JustDive.Resource.Remote.extend({
	resourceUrl: 		'/sync_histories',
	resourceName:       'sync_history',
	resourceProperties: [
							'id',
							'resource_name',
							'created_at'
						]
});
