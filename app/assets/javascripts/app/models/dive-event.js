#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.DiveEvent = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/dive_events',
	resourceName:       	'dive_event',
	resourceProperties: [
							'id', 
							'start_date',
							'end_date',
							'created_at',
							'updated_at'
						],
	title: Ember.computed(function() {
		var start 	= new Date(this.get('start_date')),
			end 	= new Date(this.get('end_date'));
		return start.getDate() + ' - ' + end.getDate() + ' ' + (parseInt(start.getMonth()) + 1);	//06 - 07 juin
	}).property('start_date', 'end_date')
});
