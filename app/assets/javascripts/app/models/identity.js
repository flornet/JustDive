JustDive.Identity = JustDive.Object.extend({
	administrator_id: '',
	authenticity_token: '',
	is_logged_in: false,
	login_view: null,
	login_offline_view: null,
	local_store_id: 'session',
	rest_routes: {
		new: 		'/identities/new.json',
		create: 	'/identities.json',
		destroy: 	'/identities/destroy.json'
	},
	email: '',
	password: '',
	
	init: function() {
		var data, store,
			identity = this;
		identity._super();
		identity._addObservers();
		// Inits Local Storage (client side)
		if (identity.local_store_id !== null) {
			store = localStorage.getItem(identity.local_store_id);
		}
		data = (store && JSON.parse(store)) || {};
		if (data.administrator_id !== undefined) {
			identity.set('administrator_id', data.administrator_id);
			identity.set('is_logged_in', true);
		} else {
			identity.set('is_logged_in', false);
		}
		// A déplacer dans un observer
		if (identity.get('authenticity_token') === '') {
			jQuery.ajax({
				url: identity.rest_routes.new,
				dataType: 'json',
				success: function(data) {
					identity.set('authenticity_token', data[0].authenticity_token);
				},
				error: function(data) {
					//...
				}
			});
		}
	},
	
	save: function() {
		var identity = this,
			identityData;
		identityData = {};
		identityData['identity'] = {};
		identityData['identity']['email'] = identity.get('email');
		identityData['identity']['password'] = identity.get('password');
		identityData['utf8'] = '&#x2713;';
		console.log(identityData);
		jQuery.ajax({
				url: identity.rest_routes.create,
				type: 'POST',
				dataType: 'json',
				headers: {
					'X-CSRF-Token': identity.get('authenticity_token')
				},
				data: identityData,
				success: function(data) {
					alert('OK');
					console.log(data);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('KO');
					console.log(textStatus);
					console.log(errorThrown);
					//...
				}
			});
	},
	
	showLogin: function() {
		var identity = this;
		identity.hideLoginOffline();
		if (identity.login_view === null) {
			identity.login_view = JustDive.NewIdentityView.create();
			identity.login_view.append();
		}
	},
	
	hideLogin: function() {
		var identity = this;
		if (identity.login_view !== null) {
			identity.login_view.remove();
			identity.login_view = null;
		}
	},
	
	showLoginOffline: function() {
		var identity = this;
		identity.hideLogin();
		if (identity.login_offline_view === null) {
			identity.login_offline_view = JustDive.OfflineIdentityView.create();
			identity.login_offline_view.append();
		}
	},
	
	hideLoginOffline: function() {
		var identity = this;
		if (identity.login_offline_view !== null) {
			identity.login_offline_view.remove();
			identity.login_offline_view = null;
		}
	},
	
	_addObservers: function() {
		var app = JustDive;
		var identity = this;
		identity.addObserver('is_logged_in', function() {
			if (!identity.is_logged_in) {
			// User is logging out
				if (!app.monitor.is_online) {
					identity.showLoginOffline();
				} else {
					identity.showLogin();
				}
			} else {
			// User is logging in
				identity.showWelcome();
			}
		});
	}
});