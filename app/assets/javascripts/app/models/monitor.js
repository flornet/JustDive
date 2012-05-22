JustDive.Monitor = JustDive.Object.extend({
	is_online: null,
		
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
		var monitor = this;
		monitor._super();
		monitor._addObservers();
		// On or Off-line?
		if (navigator.onLine) {
			monitor.setStatus(true);
		} else {
			monitor.setStatus(false);
		}
		window.addEventListener("offline", function(e) {
			monitor.setStatus(false);
		}, false);
		window.addEventListener("online", function(e) {
			monitor.setStatus(true);
		}, false);
	},
	
	_addObservers: function() {
		var app = JustDive;
		var monitor = this;
		this.addObserver('is_online', function() {
			if (!monitor.is_online) {
			// App is going offline
				if (!app.identity.is_logged_in) {
					app.identity.showLoginOffline();
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