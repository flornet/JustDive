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
	
	possibleDates: Ember.computed(function() {
		var start 	= new Date(),
			end 	= new Date(),
			output 	= JustDive.ArrayController.create({content: []});
		start.fromISOFormat(this.get('start_date'));
		end.fromISOFormat(this.get('end_date'));
		
		var currentDate = start;
		while (currentDate <= end) {
			var date = new Date(currentDate);
			output.content.pushObject( JustDive.Object.create({
																id: 	date.toISOFormat(), 
																label: 	$.fn.datepicker.dates['fr']['days'][date.getDay()] + ' ' + date.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][date.getMonth()]
																}))
			currentDate = currentDate.addDays(1);
		}
		return output;
	}).property('start_date', 'end_date').cacheable()
});
