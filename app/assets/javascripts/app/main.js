#= require ./vendor/ember/ember.js
#= require_tree ./lib/ember
#= require ./vendor/ember/ember-rest.js
#= require_self
#= require_tree ./lib/core
#= require_tree ./lib
#= require_tree ./models
#= require_tree ./controllers
#= require_tree ./views
#= require_tree ./helpers
#= require_tree ./templates

JustDive = Ember.Application.create({
	rootElement: '#app',
	viewsContainer: '#container',
	models: {},
	views: {
		divers: {}
	},
	controllers: {
		divers: null
	},
	
	localStorage: null,
	resourceAdapters: {
		local: null,
		remote: null
	},
	monitor: 	null,
	identity: 	null,
	syncCue: 	null,
	ui: 		null,
	
	bootstrap: function() {
		var app = this;
		var output, errors;
		
		// Create the controllers
		app.controllers.divers = JustDive.Controllers.Divers.create();
		
		// Create the resource adapters
		app.resourceAdapters.local = JustDive.ResourceAdapters.Local.create();
		app.resourceAdapters.remote = JustDive.ResourceAdapters.Remote.create();
		
		// Creates the ui adapter
		app.ui = JustDive.UiScreenAdapter.create();
		
		// Check compatibility of browser
		if (!app.browser.isCompatible()) {
			output = '<h1>Your device/browser is not compatible</h1>';
			errors = app.browser.getCompatibilityErrors();
			if (errors.length > 0) {
				output += '<ul><li>' + errors.join('</li><li>') + '</li></ul>';
			}
			jQuery('body').html(output);
			return false;
		}
		
		// Maps localStorage
		app.set('localStorage', localStorage);
		
		// Creates the syncCue
		app.syncCue = JustDive.SyncCue.create();
		
		/* 
		 *	This is needed:
		 *		1. identity MUST be before monitor,
		 *		2. 'identity.is_logged_in' is initiated with 'false',
		 *		3. 'monitor.is_online' is initiated with 'null'
		 */
		// Creates an identity
		app.identity = JustDive.Identity.create();
		// Creates a monitor
		app.monitor = JustDive.Monitor.create();
		
	},
	
	start: function() {
		this.bootstrap();
	},
	
	displayError: function(errorType, e) {
		var readableError = '';
		if (errorType == 'jqXHR') {
			if (e.status !== undefined) {
				readableError = '<p>' + e.status + ': ' + e.statusText + '</p>';
				switch (e.status) {
					case 404:
						break;
					default:
						if (e.responseText) {
							readableError += '<div>' + e.responseText + '</div>';
						}
				}
			} else {
				readableError = '<p>jqXHR error not recognized...</p>';
			}
		} else {
			readableError = '<p>Error type not recognized...</p>';
		}
		jQuery('#main-error-container').html(readableError);
	},
	
	getStorageInfos: function () {
		var app = this,
			result = '';
		for (var i = 0; i < app.localStorage.length; i++){
			result += '[' + app.localStorage.key(i) + ' ' + app.localStorage.getItem(app.localStorage.key(i)).length + ' bytes ] ';
		}
		return result;
	}.property('localStorage'),
	
	getStorage: function (storageId) {
		return this.storages[storageId];
	},
	
	setStorage: function (storageId, storage) {
		this.storages[storageId] = storage;
	},
	
	browser: {
		_compatibilityErrors : [],
		
		getCompatibilityErrors: function () {
			return this._compatibilityErrors;
		},
		
		isCompatible: function () {
			errors = this._compatibilityErrors;
			is_compatible = true;
			
			// AppCache, Online/offline events
			if (!window.applicationCache) {
				is_compatible = false;
				errors.push('Application cache is not supported by your device/browser');
			}
			
			// Local Storage
			if (typeof(Storage)==="undefined") {
				is_compatible = false;
				errors.push('Local storage is not supported by your device/browser');
			}
			/*
			 * Alternative solution below:
			 *
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				} catch(e){
					return false;
				}
			 */
			return is_compatible;
		}
	}
});