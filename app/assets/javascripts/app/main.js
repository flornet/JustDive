#= require ./vendor/ember/ember-debug.js
#= require ./vendor/ember/ember-rest.js
#= require_self
#= require_tree ./lib/resource
#= require_tree ./lib/core
#= require_tree ./lib
#= require_tree ./models
#= require_tree ./controllers
#= require_tree ./views
#= require_tree ./helpers
#= require_tree ./templates

JustDive = Ember.Application.create({
	APP_KEY: 			null, // JustDive 'App Key'
	version:			'1.0',
	rootElement: 		'#app',
	viewsContainer: 	'#container',
	restControllers:  	Ember.Object.create({
		divers: 				null,
		sync_local_histories: 	null,
		sync_remote_histories: 	null
	}),
	localStorage: 		null,
	monitor: 			null,
	identity: 			null,
	dataSync:			null,
	syncCue: 			null,
	dataSyncMonitor:	null,
	ui: 				null,
	
	ready: function() {
		this.bootstrap();
	},
	
	bootstrap: function() {
		var app = this;
		var output, errors;
		
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
		
		// Initialize the AppKey on first run
		app.set('APP_KEY', app.getAppKey());
		
		// Creates the Data Syncing components
		app.dataSync 		= JustDive.DataSync.create();
		app.syncCue 		= JustDive.SyncCue.create();
		app.dataSyncMonitor = JustDive.DataSyncMonitor.create();
		
		// Create the REST controllers
		app.restControllers = {
			divers: 				JustDive.Controllers.Rest.Divers.create(),
			sync_local_histories: 	JustDive.Controllers.Rest.SyncLocalHistories.create(),
			sync_remote_histories:	JustDive.Controllers.Rest.SyncRemoteHistories.create()
		};
		
		// Creates the ui adapter
		app.ui = JustDive.UiScreenAdapter.create();

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
	
	getAppKey: function() {
		var localStorage = this.get('localStorage');
		appKey = localStorage.getItem('APP_KEY');
		if (appKey === null) {
			var i = 0,
				tempKey = '',
				now = new Date();
			tempKey += 'JD(' + this.version+ ')_' + now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate() + '_';
			for (i = 0; i <= 4; i++) {
				tempKey += (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			}
			localStorage.setItem('APP_KEY', tempKey);
			appKey = localStorage.getItem('APP_KEY');
		}
		return appKey;
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