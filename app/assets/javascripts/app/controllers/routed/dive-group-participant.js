#= require ../routed.js

JustDive.Controllers.Routed.DiveGroupParticipant = JustDive.ArrayController.create({
	getRestController: function() {
		return JustDive.restControllers.dive_group_participants;
	},
/**
    New action: loads the data and appends the view
*/
	new: function(event) {
		event.preventDefault();
		var view = event.context,
			modal = JustDive.Views.DiveGroupParticipants.Detail.create();
		view.set('modal', modal);
		modal.set('diveEvent', 				view.diveEvent);
		modal.set('boatDeparture', 			view.boatDeparture);
		modal.set('diveGroup', 				view.diveGroup);
		modal.set('diveGroupParticipant', 	JustDive.Models.DiveGroupParticipant.create({dive_group_id: view.diveGroup.id}));
		modal.setCreating();
	},
/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		event.preventDefault();
		var view = event.context
			parentView = view.get('parentView'),
			modal = JustDive.Views.DiveGroupParticipants.Detail.create();
		parentView.set('modal', modal);
		modal.set('diveEvent', 				view.diveEvent);
		modal.set('boatDeparture', 			view.boatDeparture);
		modal.set('diveGroup', 				view.diveGroup);
		modal.set('diveGroupParticipant', 	view.diveGroupParticipant);
		modal.setEditing();
	},

/**
    Create action: save the newly created 'model'
*/   
	create: function(diverId, diveGroupId) {
		if (diverId.length !== 36) {
			diverId = parseInt(diverId);
		}
		if (diveGroupId.length !== 36) {
			diveGroupId = parseInt(diveGroupId);
		}
		var resource = JustDive.Models.DiveGroupParticipant.create({diver_id: diverId, dive_group_id: diveGroupId}),
			self = this;
		resource.set('dive_role_id', JustDive.restControllers.dive_roles.getPath('content.firstObject').id);
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				self.getRestController().pushObject(resource);
			});
	}, 
/**
    Update action: save the updated 'model'
*/ 
	update: function(view) {
		var self = this,
			resource = view.get('diveGroupParticipant');
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				$(view.get('element')).modal('hide');
				view.destroyElement();
				//view.set(self.get('resourceName'), resource);
				//view.setShowing();
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var self = this,
			resource = view.get('diveGroupParticipant'),
			router = JustDive.router;
		resource.destroyResource()
			.done( function() {
				self.getRestController().removeObject(resource);
				$(view.get('element')).modal('hide');
				view.destroyElement();
				//router.set('location', self.get('mainRoute'));
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	}
});