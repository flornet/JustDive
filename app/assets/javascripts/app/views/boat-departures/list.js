#= require ../boat-departures.js

JustDive.Views.BoatDepartures.List = JustDive.View.extend({
  templateName:    			'app/templates/boat-departures/list',
  classNames:   			['boat-departures-list'],
  unfilteredBinding:		"JustDive.restControllers.boat_departures",
  boatDepartures: 			function() {
								return this.get("unfiltered").filterProperty('dive_event_id', parseInt(this.get('diveEvent').id))
							}.property('unfiltered.@each').cacheable() 
  
});