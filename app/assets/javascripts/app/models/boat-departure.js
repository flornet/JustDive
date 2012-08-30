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
	unfilteredParticipantsBinding:		"JustDive.restControllers.dive_group_participants",
	unfilteredEventParticipantsBinding:	"JustDive.restControllers.dive_event_participants",
	
	departureDate:		Ember.computed(function(key, value) {
							// getter
							if (arguments.length === 1) {
								var date = this.get('departure_date');
								if (date !== undefined) {
									var tmp = date.split('T');
								}
								return tmp !== undefined ? tmp[0] : undefined;
							// setter
							} else {
								var day = value,
									time = this.get('departureTime');
								if ((day !== undefined) && (time !== undefined)) {
									this.set('departure_date', day + 'T' + time + ':00Z');
								}
								return value;
							}
						}).property('departure_date'),
						
	departureTime:		Ember.computed(function(key, value) {
							// getter
							if (arguments.length === 1) {
								var date = this.get('departure_date');
								if (date !== undefined) {
									var tmp = date.split('T');
									time = tmp[1].replace(':00Z', '');
								}
								return time !== undefined ? time : undefined;
							// setter
							} else {
								var day = this.get('departureDate'),
									time = value;
								if ((day !== undefined) && (time !== undefined)) {
									this.set('departure_date', day + 'T' + time + ':00Z');
								}
								return value;
							}
						}).property('departure_date'),

	title: 				Ember.computed(function() {
							var date = new Date(),
								day,
								month,
								hours,
								minutes;
							date.fromISOFormat(this.get('departure_date'));
							
							day 	= date.getDate().toString();
							month 	= $.fn.datepicker.dates['fr']['months'][date.getMonth()];
							hours 	= date.getHours().toString();
							minutes	= date.getMinutes().toString();
							if (hours.length === 1) {
								hours = '0' + hours;
							}
							if (minutes.length === 1) {
								minutes = '0' + minutes;
							}
							return hours + 'h' + minutes;
						}).property('departure_date'),
	
	//@TODO: duplicate code	
	fulltitle: 			Ember.computed(function() {
							var date = new Date(),
								day,
								month,
								hours,
								minutes;
							date.fromISOFormat(this.get('departure_date'));
							
							day 	= date.getDate().toString();
							month 	= $.fn.datepicker.dates['fr']['months'][date.getMonth()];
							hours 	= date.getHours().toString();
							minutes	= date.getMinutes().toString();
							if (hours.length === 1) {
								hours = '0' + hours;
							}
							if (minutes.length === 1) {
								minutes = '0' + minutes;
							}
							return 'Sortie du ' + day + ' ' + month + ' à ' + hours + 'h' + minutes;
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
							if (diveEventId !== undefined) {
								return JustDive.restControllers.dive_events.findObject(diveEventId);
							}
							if (this.get('diveEventLive') !== null) {
								return JustDive.restControllers.dive_events.findObject(this.get('diveEventLive').id);
							}
							return false;

						}).property('dive_event_id').cacheable(),

	groupsCount:		Ember.computed(function() {
							var id = this.get('id'),
								count;
							if (id !== undefined) {
								if (id.length !== 36) {
									id = parseInt(id);
								}
							}
							count = this.get("unfiltered").filterProperty('boat_departure_id', id).length;
							return  count + (count === 1 ? " palanquée" : " palanquées");
						}).property('unfiltered.@each').cacheable(),
						
	diveGroups: 		Ember.computed(function() {
							
							var id = this.get('id');
							if (id !== undefined) {
								if (id.length !== 36) {
									id = parseInt(id);
								}
							}
							//console.log('boatDeparture.diveGroups');
							return this.get("unfiltered").filterProperty('boat_departure_id', id);
							/*.sort( function(a,b){
								return a.get("id") - b.get("id");
							});*/
						}).property('unfiltered.@each').cacheable(),
						
	possibleTimes: 		Ember.computed(function() {
							var output = JustDive.ArrayController.create({content: []});
							
							output.content.pushObject(JustDive.Object.create({id: '08:00', label: '8h00'}));
							output.content.pushObject(JustDive.Object.create({id: '09:00', label: '9h00'}));
							output.content.pushObject(JustDive.Object.create({id: '10:00', label: '10h00'}));
							output.content.pushObject(JustDive.Object.create({id: '11:00', label: '11h00'}));
							output.content.pushObject(JustDive.Object.create({id: '12:00', label: '12h00'}));
							output.content.pushObject(JustDive.Object.create({id: '13:00', label: '13h00'}));
							output.content.pushObject(JustDive.Object.create({id: '14:00', label: '14h00'}));
							output.content.pushObject(JustDive.Object.create({id: '15:00', label: '15h00'}));
							output.content.pushObject(JustDive.Object.create({id: '16:00', label: '16h00'}));
							output.content.pushObject(JustDive.Object.create({id: '17:00', label: '17h00'}));
							
							return output;
						}).property().cacheable(),
	
	// Finds participants who are not already part of a diveGroup
	availableParticipants: Ember.computed(function() {
							// Dive groups
							var diveGroupsIds = this.get("diveGroups").mapProperty('id').map(function(v) {return v.toString() });
							// Participants (from all groups)
							var diveGroupsParticipants = this.get('unfilteredParticipants').filter(function(item, index, enumerable) {
								if (diveGroupsIds.indexOf(item.get('dive_group_id').toString()) > -1) {
									return item;
								} else {
									return null;
								}
							});
							
							
							// Dive event participants
							var diveEventId = this.get('dive_event_id');
							if (diveEventId !== undefined) {
								if (diveEventId.length !== 36) {
									diveEventId = parseInt(diveEventId);
								}
							}
							var diveEventParticipants = this.get('unfilteredEventParticipants').filterProperty('dive_event_id', diveEventId);
							
							// Final filtering
							var diversId = diveGroupsParticipants.mapProperty('diver_id').map(function(v) {return v.toString() });
							var availableParticipants = diveEventParticipants.filter(function(item, index, enumerable) {
								if (diversId.indexOf(item.get('diver_id').toString()) === -1) {
									return item;
								} else {
									return null;
								}
							});
							return availableParticipants;
						}).property('unfilteredParticipants.@each', 'diveGroups.@each', 'unfilteredEventParticipants.@each').cacheable() 
});
