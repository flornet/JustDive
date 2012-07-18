#= require ../controllers.js

JustDive.Controllers.Identity = JustDive.ArrayController.create({
	content: [],
	
	login: function(view) {
		var identity = JustDive.identity;
		identity.save(view);
	},
	
	logout: function() {
		var identity = JustDive.identity;
		identity.destroy();
	},
	
	onLogin: function() {
		var dataSyncMonitor = JustDive.dataSyncMonitor;
		dataSyncMonitor.start();
	},	
	
	onLogout: function() {
		var monitor 			= JustDive.monitor,
			identityController 	= this,
			dataSyncMonitor 	= JustDive.dataSyncMonitor,
			router 				= JustDive.router;
		identityController.destroyAuthToken();
		dataSyncMonitor.stop();
		if (!monitor.is_online) {
			router.set('location', 'account/network-required');
		} else {
			identityController.requestAuthToken();
			router.set('location', 'account/login');
		}
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
	},
	
	verifyLogin: function() {
		var identity = JustDive.identity;
		jQuery.ajax({
			url: identity.rest_routes.verify,
			dataType: 'json',
			success: function(data) {
				if (data.current_administrator === null) {
					identity.set('is_logged_in', false);
				} else {
					if (data.current_administrator.id !== identity.get('administrator_id')) {
						// TODO: shold be better handled
						identity.set('is_logged_in', false);
					}
				}
			},
			error: function(jqXHR) {
				JustDive.displayError('jqXHR', jqXHR);
			}
		});
	},
	
	clearLocalStorage: function() {
		localStorage.clear();
		this.logout();
		// @TODO: - recharger la page,
		//		  - supprimer l'APP KEY sur le serveur
	}
});