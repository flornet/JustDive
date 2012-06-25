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
	unfilteredBinding:	"JustDive.restControllers.dive_groups",
	
	title: 				Ember.computed(function() {
							var date = new Date();
							date.fromISOFormat(this.get('departure_date'));
							return date.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][date.getMonth()];
						}).property('departure_date'),
	
	boat: 				Ember.computed(function() {
							var boatId = this.get('boat_id') || undefined;
							if (boatId === undefined) {
								return false;
							} else {
								return JustDive.restControllers.boats.findObject(boatId);
							}
						}).property('boat_id').cacheable(),
						
	diveEvent: 			Ember.computed(function() {
							var diveEventId = this.get('dive_event_id') || undefined;
							if (diveEventId === undefined) {
								return false;
							} else {
								return JustDive.restControllers.dive_events.findObject(diveEventId);
							}
						}).property('dive_event_id').cacheable(),

	groupsCount:		Ember.computed(function() {
							return this.get("unfiltered").filterProperty('boat_departure_id', parseInt(this.get('id'))).length + ' palanquées';
						}).property('unfiltered.@each').cacheable()
});
