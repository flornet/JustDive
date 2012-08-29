#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.DiveEventParticipant = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/dive_event_participants',
	resourceName:       	'dive_event_participant',
	resourceProperties: [
							'id', 
							'diver_id',
							'dive_event_id',
							'comment',
							'created_at',
							'updated_at'
						],

	diver: 					Ember.computed(function() {
								var diverId = this.get('diver_id') || undefined;
								if (diverId === undefined) {
									return false;
								} else {
									return JustDive.restControllers.divers.findObject(diverId);
								}
							}).property('diver_id').cacheable(),
						
	diveEvent: 				Ember.computed(function() {
								var diveEventId = this.get('dive_event_id') || undefined;
								if (diveEventId !== undefined) {
									return JustDive.restControllers.dive_events.findObject(diveEventId);
								}
								if (this.get('diveEventLive') !== null) {
									return JustDive.restControllers.dive_events.findObject(this.get('diveEventLive').id);
								}
								return false;

							}).property('dive_event_id').cacheable(),
						
	formatForTypeahead: 	function() {
								return this.get('diver').formatForTypeahead();
							}
});
