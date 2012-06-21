#= require ../routed.js

JustDive.Controllers.Routed.Diver = JustDive.RoutedController.create({
	mainRoute: 		'address-book',
	resourceName: 	'diver',
	
	getRestController: function() {
		return JustDive.restControllers.divers;
	},
	
	syncGoogle: 		function(event) {
		event.preventDefault();
		jQuery.ajax({
			url: 		'divers/sync',
			dataType: 	'json',
			success: 	function(data) {
							console.log('OK');
						},
			error: 		function(jqXHR) {
							JustDive.displayError('jqXHR', jqXHR);
						}
		});
	}
});