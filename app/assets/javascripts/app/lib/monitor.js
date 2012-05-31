JustDive.Monitor = JustDive.Object.extend({
	is_online: null,
		
	status: function() {
		if (this.get('is_online')) {
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
		var monitor = this,
			monitorController = JustDive.monitorController;
		monitor.addObserver('is_online', function() {
			if (!monitor.is_online) {
			// App is going offline
				monitorController.onOffline();
			} else {
			// App is going online
				monitorController.onOnline();
			}
		});
	}
});