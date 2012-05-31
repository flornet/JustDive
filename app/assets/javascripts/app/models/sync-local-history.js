JustDive.models.syncLocalHistory = JustDive.Resource.extend({
	resourceAdapter: 	JustDive.resourceAdapters.local,
	resourceUrl: 		'/divers',
	resourceName:       'diver',
	resourceProperties: [
							'id', 
							'resource_name', 
							'created_at'
						]
});
