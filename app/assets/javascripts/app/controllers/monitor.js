#= require ../controllers.js

JustDive.Controllers.Monitor = JustDive.ArrayController.create({
	content: [],
		
	onOnline: function() {
		var logged_in 			= JustDive.identity.is_logged_in,
		    identityController 	= JustDive.Controllers.Identity,
			dataSyncMonitor 	= JustDive.dataSyncMonitor,
			router				= JustDive.router;
		identityController.requestAuthToken();
		identityController.verifyLogin();
		if (!logged_in) {
			router.set('location', 'account/login');
		} else {
			dataSyncMonitor.start();
		}
	},
	
	onOffline: function() {
		var logged_in 			= JustDive.identity.is_logged_in,
		    identityController 	= JustDive.Controllers.Identity,
			dataSyncMonitor 	= JustDive.dataSyncMonitor,
			router				= JustDive.router;
		identityController.destroyAuthToken();
		dataSyncMonitor.stop();
		if (!logged_in) {
			router.set('location', 'account/network-required');
		}
	}
});