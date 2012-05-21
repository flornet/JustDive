JustDive.Identity = JustDive.Object.extend({
	administrator_id: '',
	is_logged_in: false,
	login_view: null,
	local_store_id: 'session',
	rest_routes: {
		new: '/identities/new.json',
		destroy: '/identities/destroy.json'
	},
	
	init: function() {
		var data, store;
		this._super();
		// Inits Local Storage (client side)
		if (this.local_store_id !== null) {
			store = localStorage.getItem(this.local_store_id);
		}
		data = (store && JSON.parse(store)) || {};
		if (data.administrator_id !== undefined) {
			this.set('administrator_id', data.administrator_id);
			this.set('is_logged_in', true);
		}
		this._addObservers();
	},
	
	showLogin: function() {
		var identity = this;
		if (identity.login_view == null) {
			jQuery.ajax({
			  url: identity.rest_routes.new,
			  dataType: 'json',
			  success: function(data) {
				var view = JustDive.NewIdentityView.create();
				view.authenticity_token = data.authenticity_token;
				view.append();
				identity.login_view = view;
			  }
			});	
		}
	},
	
	_addObservers: function() {
		//this.addObserver('is_logged_in', function() {
		  // deal with the change
		//});
	}
	
});