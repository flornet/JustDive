#= require ./resource/adapter/local.js
#= require ./resource/adapter/remote.js

JustDive.DataSync = JustDive.Object.extend(JustDive.Resource.Adapter.Local, JustDive.Resource.Adapter.Remote, {
	historiesControllerName: 	'sync_local_histories',
	is_monitored: 				false,
	is_processing: 				false,
	sync_cycle: 				{},
	pid: 						null,
	processingFrequency: 		5000,
	
	getControllers: function() {
		return JustDive.restControllers;
	},
	
	// First run of the app initializes local data
	initialize: function() {
		var dataSync 		= this,
			controllers 	= this.getControllers(),
			result 			= false,
			syncController 	= this.getControllers()[this.historiesControllerName],
			synchronizableControllers = [],
			controller;
		
		// Initialization a the Sync Cycle
		if (dataSync.get('sync_cycle') === {}) {
			var cycle = {};
			for (key in this.getControllers()) {
				controller = this.getControllers()[key];
				if (controller.isSynchronizable) {
					cycle[key] = { 
								controller: controller, 
								synchronized: false
							  };
				}
			}
			dataSync.set('sync_cycle', cycle);
		}
		
		// First synchronization of the data
		if (syncController.isInitialized()) {
			result = true;
		} else {
			dataSync.set('is_processing', true);
			var cycle = dataSync.get('sync_cycle');
			for (key in cycle) {
				var cycleEntry = cycle[key];
				console.log(cycleEntry);
				cycleEntry.controller.firstSynchronize();
			}
			dataSync.set('is_processing', false);
		}
		return result;
	},
	
	process: function() {
		var dataSync = this;
		if (!dataSync.get('is_processing')) { // && cue.empty
			dataSync.set('is_processing', true);
			var cycle = dataSync.get('sync_cycle');
			for (key in cycle) {
				var cycleEntry = cycle[key];
				console.log(cycleEntry);
				cycleEntry.controller.diffSynchronize();
			}
		}
	},

	markAsSynced: function(resource_name) {
		var dataSync = this;
		var syncLocalEntry = JustDive.Models.SyncLocalHistory.create({
																	resource_name: 	resource_name, 
																	created_at: 	new Date()
																});
		var syncRemoteEntry = JustDive.Models.SyncRemoteHistory.create({
																	resource_name: 	resource_name
																});
		syncRemoteEntry.saveResource()
			.done(function (json) {
				syncLocalEntry.saveResource()
					.done(function (json) {
						console.log(resource_name + ' has been successfully synchronized');
						dataSync.get('sync_cycle')[resource_name].synchronized = true;
						dataSync.set('is_processing', false);
						dataSync.process();
					})
					.fail(function(e) {
						JustDive.displayError('jqXHR', e);
					});
			})
			.fail(function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},
	
})