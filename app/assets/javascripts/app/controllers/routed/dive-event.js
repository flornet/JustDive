#= require ../routed.js

JustDive.Controllers.Routed.DiveEvent = JustDive.RoutedController.create({
	mainRoute: 		'dive-events',
	resourceName: 	'diveEvent',
	
	getRestController: function() {
		return JustDive.restControllers.dive_events;
	}
	
});