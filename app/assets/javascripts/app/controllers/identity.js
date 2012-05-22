JustDive.identityController = JustDive.ArrayController.create({
	content: [],
	
	_initViews: function() {
		if (this.views === undefined) {
			this.views = {
							login: 			JustDive.NewIdentityView.create(),
							login_offline: 	JustDive.OfflineIdentityView.create(),
							welcome: 		JustDive.WelcomeIdentityView.create()
						};
		}
	},
	
	login: function() {
		var identity = JustDive.identity;
		identity.save();
	},
	
	logout: function() {
		var identity = JustDive.identity;
		identity.destroy();
	},
	
	onLogin: function() {
		this.showWelcome();
	},	
	
	onLogout: function() {
		var monitor = JustDive.monitor,
			identityController = this;
		identityController.destroyAuthToken();
		if (!monitor.is_online) {
			identityController.showLoginOffline();
		} else {
			identityController.requestAuthToken();
			identityController.showLogin();
		}
	},
	
	/**
	Shows the login panel
	*/
	showLogin: function() {
		this._initViews();
		this.views.login_offline.remove();
		this.views.welcome.remove();
		this.views.login.appendTo(JustDive.viewsContainer);
	},
	
	/**
	Shows the login panel when offline
	*/
	showLoginOffline: function() {
		this._initViews();
		this.views.welcome.remove();
		this.views.login.remove();
		this.views.login_offline.appendTo(JustDive.viewsContainer);
	},
	
	/**
	Shows the welcome panel
	*/
	showWelcome: function() {
		this._initViews();
		this.views.login.remove();
		this.views.login_offline.remove();
		this.views.welcome.appendTo(JustDive.viewsContainer);
	},
	
	requestAuthToken: function() {
		var identity = JustDive.identity;
		jQuery.ajax({
			url: identity.rest_routes.get_token,
			dataType: 'json',
			success: function(data) {
				identity.set('authenticity_token', data.authenticity_token);
			},
			error: function(jqXHR) {
				JustDive.displayError('jqXHR', jqXHR);
			}
		});
	},
	
	destroyAuthToken: function() {
		var identity = JustDive.identity;
		identity.set('authenticity_token', '');
	}
});