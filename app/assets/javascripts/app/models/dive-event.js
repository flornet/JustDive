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
			end 	= new Date(this.get('end_date')),
			output;
		if (start.getMonth() === end.getMonth()) {
			output = start.getDate() + ' au ' + end.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][start.getMonth()];	//06 au 07 juin
		} else {
			output = start.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][start.getMonth()] + ' au ' + end.getDate() + ' ' + $.fn.datepicker.dates['fr']['months'][end.getMonth()];	//06 juin au 06 juillet
		}
		return output;
	}).property('start_date', 'end_date')
});
