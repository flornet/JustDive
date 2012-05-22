JustDive.Identity = JustDive.Object.extend({
	administrator_id: 		'',
	authenticity_token: 	'',
	is_logged_in: 			false,
	local_store_id: 		'session',
	rest_routes: {
		get_token: 	'/identities/get_token.json',
		create: 	'/identities.json',
		destroy: 	'/identities/destroy.json'
	},
	email: 					'',
	password: 				'',
	
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
		/////// Ajouter des tests pour récupérer la session depuis le serveur
		if (data.administrator_id !== undefined) {
			identity.set('administrator_id', data.administrator_id);
			identity.set('is_logged_in', true);
		} else {
			identity.set('is_logged_in', false);
		}
		// A déplacer dans un observer
		if (identity.get('authenticity_token') === '') {
			jQuery.ajax({
				url: identity.rest_routes.get_token,
				dataType: 'json',
				success: function(data) {
					identity.set('authenticity_token', data.authenticity_token);
				},
				error: function(data) {
					//...
				}
			});
		}
	},
	
	save: function() {
		var identity = this,
			identityController = JustDive.identityController,
			identityData;
		identityData = {
			'identity': {
							'email': 	identity.get('email'),
							'password': identity.get('password')
						},
			'utf8': "&#x2713;"
		};
		jQuery.ajax({
				url: 		identity.rest_routes.create,
				type: 		'POST',
				dataType: 	'json',
				headers: 	{
								'X-CSRF-Token': identity.get('authenticity_token')
							},
				data: 		identityData,
				success: 	function(savedIdentity) {
								localStorage.setItem(identity.local_store_id, JSON.stringify(savedIdentity));
								identity.set('administrator_id', savedIdentity.administrator_id);
								identity.set('is_logged_in', true);
								identity.set('password', '');
							},
				error: 		function(jqXHR, textStatus, errorThrown) {
								error = JSON.parse(jqXHR.responseText);
								if (error.password !== undefined) {
									readableError = error.password.join('<br />');
								} else {
									readableError = jqXHR.responseText;
								}
								identityController.views.login.set('error', readableError);
				}
			});
	},
	
	destroy: function() {
		var identity = this;
		localStorage.setItem(identity.local_store_id, JSON.stringify({}));
		identity.set('administrator_id', '');
		identity.set('is_logged_in', false);
	},
	
	_addObservers: function() {
		var identity = this,
			identityController = JustDive.identityController;
		identity.addObserver('is_logged_in', function() {
			if (!identity.is_logged_in) {
			// User is logging out
				identityController.onLogout();
			} else {
			// User is logging in
				identityController.onLogin();
			}
		});
	}
});