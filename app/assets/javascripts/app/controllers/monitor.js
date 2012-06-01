#= require ../controllers.js

JustDive.Controllers.Monitor = JustDive.ArrayController.create({
	content: [],
	
	onOnline: function() {
		var identity = JustDive.identity,
		    identityController = JustDive.Controllers.Identity;
		identityController.requestAuthToken();
		identityController.verifyLogin();
		JustDive.syncCue.startMonitoring();
		if (!identity.is_logged_in) {
			identityController.showLogin();
		}
	},
	
	onOffline: function() {
		var identity = JustDive.identity,
		    identityController = JustDive.Controllers.Identity;
		identityController.destroyAuthToken();
		JustDive.syncCue.stopMonitoring();
		if (!identity.is_logged_in) {
			identityController.showLoginOffline();
		}
	}
});