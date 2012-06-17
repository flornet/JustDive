#= require ../dive-events.js

JustDive.Views.DiveEvents.List = JustDive.View.extend({
  templateName:    		'app/templates/dive-events/list',
  classNames:   		['dive-events-list'],
  diveEventsBinding: 	'JustDive.restControllers.dive_events'
});