#= require ../routed.js

JustDive.Controllers.Routed.FfessmLevel = JustDive.RoutedController.create({
	mainRoute: 		'club-admin/ffessm-levels',
	resourceName: 	'ffessmLevel',
	
	getRestController: function() {
		return JustDive.restControllers.ffessm_levels;
	}
});