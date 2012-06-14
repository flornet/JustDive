#= require ../routed.js

JustDive.Controllers.Routed.DiveRole = JustDive.RoutedController.create({
	mainRoute: 		'club-admin/dive-roles',
	resourceName: 	'diveRole',
	
	getRestController: function() {
		return JustDive.restControllers.dive_roles;
	}
});