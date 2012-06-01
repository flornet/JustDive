#= require ./resource/adapter/local.js
#= require ./resource/adapter/remote.js

JustDive.DataSync = JustDive.Object.extend(JustDive.Resource.Adapter.Local, JustDive.Resource.Adapter.Remote, {
	historiesControllerName: 	'sync_local_histories',
	processingFrequency: 		5000,
	
	getControllers: function() {
		return JustDive.restControllers;
	},
	
	initialize: function() {
		var controllers = this.getControllers(),
			controller,
			syncController = this.getControllers()[this.historiesControllerName],
			synchronizableControllers = [],
			result = false;
		
		if (syncController.isInitialized()) {
			result = true;
		} else {
			console.log('initialize START');
			for (key in this.getControllers()) {
				controller = this.getControllers()[key];
				if (controller.isSynchronizable) {
					controller.synchronize();
				}
			}
			console.log('initialize END');
		}
		return result;
	}
})