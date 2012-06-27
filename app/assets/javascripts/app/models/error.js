#= require ../models.js
#= require ../lib/resource/local.js

JustDive.Models.Error = JustDive.Resource.Local.extend({
	resourceUrl: 		'/errors',
	resourceName:       'error',
	resourceProperties: [
							'id', 
							'code',
							'message',
							'created_at'
						],
	date:				Ember.computed(function() {
							var createdAt = this.get('created_at'),
								output;
							output = $.fn.datepicker.dates['fr']['days'][createdAt.getDay()] + ' ' +
									 createdAt.getDate() + ' ' +
									 $.fn.datepicker.dates['fr']['months'][createdAt.getMonth()] + ' ' +
									 createdAt.getFullYear(); 
							return output;
						}).property('created_at').cacheable(),
	
	hour:				Ember.computed(function() {
							var createdAt = this.get('created_at'),
								output;
							output = createdAt.getHours() + 'h' + createdAt.getMinutes() + ' (' + createdAt.getSeconds() + 's)'; 
							return output;
						}).property('created_at').cacheable(),
});
