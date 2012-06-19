#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.BoatDeparture = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/boat_departures',
	resourceName:       	'boat_departure',
	resourceProperties: [
							'id', 
							'boat_id',
							'dive_event_id',
							'departure_date',
							'created_at',
							'updated_at'
						],
	title: Ember.computed(function() {
		var date = new Date();
		date.fromISOFormat(this.get('departure_date'));
		return date.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][date.getMonth()];
	}).property('departure_date')
});
