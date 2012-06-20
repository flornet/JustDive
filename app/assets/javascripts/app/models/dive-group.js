#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.DiveGroup = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/dive_groups',
	resourceName:       	'dive_group',
	resourceProperties: [
							'id', 
							'boat_departure_id',
							'estimated_dive_depth',
							'estimated_dive_time',
							'realized_dive_time',
							'realized_dive_depth',
							'immersion_start_time',
							'immersion_end_time',
							'created_at',
							'updated_at'
						],
	title: Ember.computed(function() {
		return this.get('id');
	}).property('id')
});
