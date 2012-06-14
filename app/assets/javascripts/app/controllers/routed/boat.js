#= require ../routed.js

JustDive.Controllers.Routed.Boat = JustDive.RoutedController.create({
	mainRoute: 		'club-admin/boats',
	resourceName: 	'boat',
	
	getRestController: function() {
		return JustDive.restControllers.boats;
	}
});