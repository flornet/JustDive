#= require ../routed.js

JustDive.Controllers.Routed.DiveEventParticipant = JustDive.RoutedController.create({
	resourceName: 	'diveEventParticipant',
	
	getRestController: function() {
		return JustDive.restControllers.dive_event_participants;
	},
	
	quickCreate: function(item, val, text, view) {
		var resource = JustDive.Models.DiveEventParticipant.create({dive_event_id: view.diveEvent.id}),
			self = this;
		resource.set('diver_id', val);
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				self.getRestController().pushObject(resource);
			});
    },
	
	destroy: function(view) {
		var router = JustDive.router,
			mainRoute = this.get('mainRoute'),
			newMainRoute = router.location;
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}
});