#= require ./resource/adapter/local.js
#= require ./resource/adapter/remote.js

JustDive.DataSync = JustDive.Object.extend(JustDive.Resource.Adapter.Local, JustDive.Resource.Adapter.Remote, {
	is_monitored: 				false,
	is_processing: 				false,
	sync_cycle: 				{},
	pid: 						null,
	processingFrequency: 		10000,
	
	getControllers: function() {
		return JustDive.restControllers;
	},
	
	getSyncCue: function() {
		return JustDive.syncCue;
	},
	
	initialize: function() {
		if (this.getObjectSize(this.get('sync_cycle')) === 0) {
			this._initSyncCycle();
		}
	},
	
	process: function() {
		var dataSync = this;
		if (!dataSync.get('is_processing') && dataSync.getSyncCue().getRequests().length === 0) {
			//console.log('Processing data-sync');
			dataSync.set('is_processing', true);
			var cycle = dataSync.get('sync_cycle');
			for (key in cycle) {
				var cycleEntry = cycle[key];
				if (cycleEntry.synchronized === false) {
					cycleEntry.controller.diffSynchronize();
				}
			}
		}
	},
	
	_initSyncCycle: function() {
		// Initialization a the Sync Cycle
		var dataSync = this,
			cycle = {};
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
	},
	
	_checkCycleEndAndContinue: function() {
		var dataSync = this,
			synced = 0,
			syncable = 0;
		
		var cycle = dataSync.get('sync_cycle');
		
		for (key in cycle) {
			syncable += 1;
			if (cycle[key].synchronized === true) {
				synced += 1;
			}
		}
		
		if (synced === syncable) {
			dataSync._initSyncCycle();
		}
		
		dataSync.set('is_processing', false);
		
		//if (synced !== syncable) {
			//dataSync.process();
		//}
	},
	
	isUpToDate: function(resource_name) {
		var dataSync = this;
		dataSync.get('sync_cycle')[resource_name].synchronized = true;
		dataSync._checkCycleEndAndContinue();
	},

	markAsSynced: function(resource_name) {
		var dataSync = this;
		var syncRemoteEntry = JustDive.Models.SyncRemoteHistory.create({
																	resource_name: 	resource_name
																});
		syncRemoteEntry.saveResource()
			.done(function (json) {
				//console.log(resource_name + ' has been successfully synchronized');
				dataSync._checkCycleEndAndContinue();
				dataSync.get('sync_cycle')[resource_name].synchronized = true;
				dataSync._checkCycleEndAndContinue();
			})
			.fail(function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},
	
})