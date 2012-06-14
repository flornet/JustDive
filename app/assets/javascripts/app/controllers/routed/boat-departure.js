#= require ../routed.js

JustDive.Controllers.Routed.BoatDeparture = JustDive.RoutedController.create({
	mainRoute: 		'boat-departure',
	resourceName: 	'boatDeparture',
	
	getRestController: function() {
		return JustDive.restControllers.boat_departures;
	}
});