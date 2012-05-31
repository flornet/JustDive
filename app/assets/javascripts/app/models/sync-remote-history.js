JustDive.models.syncRemoteHistory = JustDive.Resource.extend({
	resourceAdapter: 	JustDive.resourceAdapters.remote,
	resourceUrl: 		'/divers',
	resourceName:       'diver',
	resourceProperties: [
							'id', 
							'resource_name',
							'created_at'
						]
});
