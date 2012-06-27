#= require ../routed.js

JustDive.Controllers.Routed.Error = JustDive.RoutedController.create({
	mainRoute: 		'errors',
	resourceName: 	'error',
	
	getRestController: function() {
		return JustDive.restControllers.errors;
	},
	
	create: function(error) {
		var self = this,
			router = JustDive.router;
		error.saveResource()
			.fail( function(e) {
				alert("Couldn't save error");
				console.log(e);
				//JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				self.getRestController().pushObject(error);
				router.set('location', self.get('mainRoute'));
			});
	}, 
});