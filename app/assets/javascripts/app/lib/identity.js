JustDive.Identity = JustDive.Object.extend({
	administrator_id:	'',
	authenticity_token:	'',
	is_logged_in: 		false,
	local_store_id: 	'session',
	rest_routes: {
						get_token: 	'/identity/get_token',
						create: 	'/identity',
						destroy: 	'/identity',
						verify:		'/identity/show'
					},
	email: 				'',
	password: 			'',
	identityController: null,
	
	init: function() {
		var identity = this;
		identity._super();
		identity.identityController = JustDive.Controllers.Identity;
		identity._addObservers();
		identity.load();
	},
	
	load: function() {
		var data, store,
			identity = this,
			app = JustDive;
		// Inits Local Storage (client side)
		if (identity.local_store_id !== null) {
			store = app.localStorage.getItem(identity.local_store_id);
		}
		data = (store && JSON.parse(store)) || {};
		/////// Ajouter des tests pour récupérer la session depuis le serveur
		if (data.administrator_id !== undefined) {
			identity.set('administrator_id', data.administrator_id);
			identity.set('email', data.email);
			identity.set('is_logged_in', true);
		} else {
			identity.set('is_logged_in', false);
		}
	},
	
	save: function(view) {
		var identity = this,
			identityController = this.identityController,
			identityData,
			app = JustDive;
		identityData = {
			'identity': {
							'email': 	identity.get('email'),
							'password': identity.get('password'),
							'app_key':	JustDive.APP_KEY
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
								app.localStorage.setItem(identity.local_store_id, JSON.stringify(savedIdentity));
								identity.set('administrator_id', savedIdentity.administrator_id);
								identity.set('is_logged_in', true);
								identity.set('password', '');
								JustDive.router.set('location', 'account/welcome');
							},
				error: 		function(jqXHR, textStatus, errorThrown) {
								error = JSON.parse(jqXHR.responseText);
								if (error.password !== undefined) {
									readableError = error.password.join('<br />');
								} else {
									readableError = jqXHR.responseText;
								}
								view.set('error', readableError);
				}
			});
	},
	
	destroy: function() {
		var identity = this,
			identityController = this.identityController,
			app = JustDive;
		jQuery.ajax({
				url: 		identity.rest_routes.destroy,
				type: 		'DELETE',
				dataType: 	'json',
				headers: 	{
								'X-CSRF-Token': identity.get('authenticity_token')
							},
				success: 	function(savedIdentity) {
								app.localStorage.setItem(identity.local_store_id, JSON.stringify({}));
								identity.set('administrator_id', '');
								identity.set('is_logged_in', false);
							},
				error: 		function(jqXHR) {
								JustDive.displayError('jqXHR', jqXHR);
				}
			});
	},
	
	_addObservers: function() {
		var identity = this,
			identityController = this.identityController;
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