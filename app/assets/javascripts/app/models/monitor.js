JustDive.Monitor = JustDive.Object.extend({
	is_online: false,
		
	status: function() {
		if (this.is_online) {
			return('ONLINE');
		} else {
			return('OFFLINE');
		}
	}.property('is_online'),
	
	setStatus: function(status) {
		this.set('is_online', status);
	},
	
	init: function() {
		this._super();
		var monitor = this;
		// On or Off-line?
		if (navigator.onLine) {
			monitor.setStatus(true);
		}
		window.addEventListener("offline", function(e) {
			monitor.setStatus(false);
		}, false);
		window.addEventListener("online", function(e) {
			monitor.setStatus(true);
		}, false);
		monitor._addObservers();
	},
	
	_addObservers: function() {
		var app = JustDive;
		this.addObserver('is_online', function() {
			// App is going offline
			if (!app.monitor.is_online) { 
				if (!app.identity.is_logged_in) {
					app.identity.showLogin();
				}
			} else {
			// App is going online
				if (!app.identity.is_logged_in) {
					app.identity.showLogin();
				}
			}
		});
	}
});