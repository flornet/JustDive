#= require ../routed.js

JustDive.Controllers.Routed.DiveEventParticipant = JustDive.ArrayController.create({
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
    }
});