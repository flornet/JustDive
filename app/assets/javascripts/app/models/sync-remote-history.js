#= require ../models.js
#= require ../lib/resource/remote.js

JustDive.Models.SyncRemoteHistory = JustDive.Resource.Remote.extend({
	resourceUrl: 		'/divers',
	resourceName:       'diver',
	resourceProperties: [
							'id', 
							'resource_name',
							'created_at'
						]
});
