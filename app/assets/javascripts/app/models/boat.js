#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.Boat = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/boats',
	resourceName:       	'boat',
	resourceProperties: [
							'id', 
							'name',
							'created_at',
							'updated_at'
						]
});
