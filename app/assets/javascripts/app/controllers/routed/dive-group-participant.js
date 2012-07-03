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
	create: function(view) {
		var self = this,
			resource = view.get('diveGroupParticipant');
		resource.set('dive_group_id', view.diveGroup.id); // Refreshes the dive_group_id since it might have changed
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				//console.log(self.getRestController());
				self.getRestController().pushObject(resource);
				$(view.get('element')).modal('hide');
				view.destroyElement();
				//router.set('location', self.get('mainRoute') + '/' + resource.id);
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