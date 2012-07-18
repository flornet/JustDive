#= require ../routed.js

JustDive.Controllers.Routed.FfessmLevel = JustDive.RoutedController.create({
	mainRoute: 		'club-admin/ffessm-levels',
	resourceName: 	'ffessm_level',
	
	getRestController: function() {
		return JustDive.restControllers.ffessm_levels;
	}
});