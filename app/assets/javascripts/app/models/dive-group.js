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
	unfilteredBinding:		"JustDive.restControllers.dive_group_participants",
	
	participantsCount: 	Ember.computed(function() {
							var count = this.get("participants").length;
							return  count + (count === 1 ? " plongeur" : " plongeurs");
						}).property('participants.@each').cacheable(),
						
	boatDeparture:		Ember.computed(function() {
							var boatDepartureId = this.get('boat_departure_id') || undefined;
							if (boatDepartureId !== undefined) {
								return JustDive.restControllers.boat_departures.findObject(boatDepartureId);
							}
							if (this.get('boatDepartureLive') !== null) {
								return JustDive.restControllers.boat_departures.findObject(this.get('boatDepartureLive').id);
							}
							return false;
						}).property('boat_departure_id').cacheable(),
						
	participants: 		Ember.computed(function() {
							var id = this.get('id');
							if (id !== undefined) {
								if (id.length !== 36) {
									id = parseInt(id);
								}
							}
							//console.log(this.get("unfiltered"));
							return this.get("unfiltered").filterProperty('dive_group_id', id);
						}).property('unfiltered.@each').cacheable() 
});
