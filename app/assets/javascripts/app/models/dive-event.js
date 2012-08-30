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
	unfilteredBinding:		"JustDive.restControllers.boat_departures",
	
	unfilteredDiversBinding:"JustDive.restControllers.dive_event_participants",
	
	cssClass:				Ember.computed(function() {
								return 'event-' + this.get('id');
							}).property('id').cacheable(),
	
	title: 					Ember.computed(function() {
								var start 	= new Date(),
									end 	= new Date(),
									output;
								start.fromISOFormat(this.get('start_date'));
								end.fromISOFormat(this.get('end_date'));
								if (start.getMonth() === end.getMonth()) {
									output = start.getDate() + ' au ' + end.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][start.getMonth()];	//06 au 07 juin
								} else {
									output = start.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][start.getMonth()] + ' au ' + end.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][end.getMonth()];	//06 juin au 06 juillet
								}
								return output;
							}).property('start_date', 'end_date').cacheable(),
	
	possibleDates: 			Ember.computed(function() {
								var start 	= new Date(),
									end 	= new Date(),
									output 	= JustDive.ArrayController.create({content: []});
								start.fromISOFormat(this.get('start_date'));
								end.fromISOFormat(this.get('end_date'));
								
								var currentDate = start;
								while (currentDate <= end) {
									var date = new Date(currentDate)
										that = this,
										entry = JustDive.Object.create({
																		id: 				date.toISOFormat(), 
																		label: 				$.fn.datepicker.dates['fr']['days'][date.getDay()] + ' ' + date.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][date.getMonth()],
																		unfilteredBinding:	"JustDive.restControllers.boat_departures",
																		
																		// @TODO: bad duplicated code!
																		boatDepartures:		Ember.computed(function() {
																								var id = that.get('id');
																								if (id !== undefined) {
																									if (id.length !== 36) {
																										id = parseInt(id);
																									}
																								}
																								return this.get("unfiltered")
																										   .filterProperty('dive_event_id', id)
																										   .filterProperty('departureDate' , this.id)
																										   .sort( function(a,b){
																												var aStart = new Date(),
																													bStart = new Date();
																												aStart.fromISOFormat(a.get('departure_date'));
																												bStart.fromISOFormat(b.get('departure_date'));
																												return aStart - bStart;
																											});
																							}).property('unfiltered.@each').cacheable()
																	});
									output.content.pushObject(entry);
									currentDate = currentDate.addDays(1);
								}
								return output;
							}).property('start_date', 'end_date').cacheable(),
	
	boatDepartures: 		Ember.computed(function() {
								var id = this.get('id');
								if (id !== undefined) {
									if (id.length !== 36) {
										id = parseInt(id);
									}
								}
								return this.get("unfiltered").filterProperty('dive_event_id', id);
								/*.sort( function(a,b){
									var aStart = new Date(),
										bStart = new Date();
									aStart.fromISOFormat(a.get('departure_date'));
									bStart.fromISOFormat(b.get('departure_date'));
									return aStart - bStart;
								});*/
							
							}).property('unfiltered.@each').cacheable(),
	
	participants: 			Ember.computed(function() {
								var id = this.get('id');
								if (id !== undefined) {
									if (id.length !== 36) {
										id = parseInt(id);
									}
								}
								return this.get("unfilteredDivers").filterProperty('dive_event_id', id);/*.sort( function(a,b){
									var aStart = new Date(),
										bStart = new Date();
									aStart.fromISOFormat(a.get('departure_date'));
									bStart.fromISOFormat(b.get('departure_date'));
									return aStart - bStart;
								});*/
							}).property('unfilteredDivers.@each').cacheable(),
						
	validateData: 			function() {
								var result = {
												errors:  [],
												isValid: true
											};
								if ((this.get('start_date') === undefined) || (this.get('start_date') === '')) {
									result.errors.push('La date de début est nécessaire');
									result.isValid = false;
								}
								if ((this.get('end_date') === undefined) || (this.get('end_date') === '')) {
									result.errors.push('La date de fin est nécessaire');
									result.isValid = false;
								}
								if ((result.isValid) && (this.get('start_date') > this.get('end_date'))) {
									result.errors.push('La date de fin doit être postérieure à la date de début.');
									result.isValid = false;
								}
								return result;
							  }
});
