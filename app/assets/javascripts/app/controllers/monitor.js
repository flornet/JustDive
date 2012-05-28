JustDive.monitorController = JustDive.ArrayController.create({
	content: [],
	
	onOnline: function() {
		var identity = JustDive.identity,
		    identityController = JustDive.identityController;
		identityController.requestAuthToken();
		JustDive.syncCue.startMonitoring();
		if (!identity.is_logged_in) {
			identityController.showLogin();
		}
	},
	
	onOffline: function() {
		var identity = JustDive.identity,
		    identityController = JustDive.identityController;
		identityController.destroyAuthToken();
		JustDive.syncCue.stopMonitoring();
		if (!identity.is_logged_in) {
			identityController.showLoginOffline();
		}
	}
});