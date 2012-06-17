#= require ../routed.js

JustDive.Controllers.Routed.Diver = JustDive.RoutedController.create({
	mainRoute: 		'address-book',
	resourceName: 	'diver',
	
	getRestController: function() {
		return JustDive.restControllers.divers;
	}
});