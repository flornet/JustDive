#= require ../controllers.js

JustDive.Controllers.Monitor = JustDive.ArrayController.create({
	content: [],
	
	onOnline: function() {
		var identity 			= JustDive.identity,
		    identityController 	= JustDive.Controllers.Identity,
			dataSyncMonitor 	= JustDive.dataSyncMonitor;
		identityController.requestAuthToken();
		identityController.verifyLogin();
		if (!identity.is_logged_in) {
			identityController.showLogin();
		} else {
			dataSyncMonitor.start();
		}
	},
	
	onOffline: function() {
		var identity 			= JustDive.identity,
		    identityController 	= JustDive.Controllers.Identity,
			dataSyncMonitor 	= JustDive.dataSyncMonitor;
		identityController.destroyAuthToken();
		dataSyncMonitor.stop();
		if (!identity.is_logged_in) {
			identityController.showLoginOffline();
		}
	}
});