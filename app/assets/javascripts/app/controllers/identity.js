JustDive.identityController = JustDive.ArrayController.create({
	content: [],
	views: {
				login: 			JustDive.NewIdentityView.create(),
				login_offline: 	JustDive.OfflineIdentityView.create(),
				welcome: 		JustDive.WelcomeIdentityView.create()
			},
	
	logout: function() {
		var identity = JustDive.identity;
		identity.destroy();
	},
	
	login: function() {
		var identity = JustDive.identity;
		identity.save();
	},
	
	onLogout: function() {
		var monitor = JustDive.monitor,
			identityController = this;
		if (!monitor.is_online) {
			identityController.showLoginOffline();
		} else {
			identityController.showLogin();
		}
	},
	
	onLogin: function() {
		this.showWelcome();
	},
	
	showLogin: function() {
		this.views.login_offline.remove();
		this.views.welcome.remove();
		this.views.login.append();
	},
	
	showLoginOffline: function() {
		this.views.welcome.remove();
		this.views.login.remove();
		this.views.login_offline.append();
	},
	
	showWelcome: function() {
		this.views.login.remove();
		this.views.login_offline.remove();
		this.views.welcome.append();
	}
});