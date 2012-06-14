#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.DiveRole = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/dive_roles',
	resourceName:       	'dive_role',
	resourceProperties: [
							'id', 
							'name',
							'created_at',
							'updated_at'
						]
});
