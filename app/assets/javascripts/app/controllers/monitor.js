JustDive.monitorController = JustDive.ArrayController.create({
	content: [],
	
	onOnline: function() {
		var identity = JustDive.identity,
		    identityController = JustDive.identityController;
		if (!identity.is_logged_in) {
			identityController.showLogin();
		}
	},
	
	onOffline: function() {
		var identity = JustDive.identity,
		    identityController = JustDive.identityController;
		if (!identity.is_logged_in) {
			identityController.showLoginOffline();
		}
	}
});