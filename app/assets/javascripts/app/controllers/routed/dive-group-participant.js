#= require ../routed.js

JustDive.Controllers.Routed.DiveGroupParticipant = JustDive.ArrayController.create({
	getRestController: function() {
		return JustDive.restControllers.dive_group_participants;
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
	update: function(diveGroupParticipantId, diveGroupId) {
		var self = this,
			resource = JustDive.restControllers.dive_group_participants.findObject(diveGroupParticipantId);
		if (diveGroupId.length !== 36) {
			diveGroupId = parseInt(diveGroupId);
		}

		resource.set('dive_group_id', diveGroupId);
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				self.getRestController().removeObject(resource);
				self.getRestController().pushObject(resource);
			});
	},
	
/**
    UpdateRole action: save the updated 'model'
*/ 
	updateRole: function(event) {
		var self = this,
			resource = JustDive.restControllers.dive_group_participants.findObject(event.view.diveGroupParticipant.id),
			diveRoleId = event.context.id;
		if (diveRoleId.length !== 36) {
			diveRoleId = parseInt(diveRoleId);
		}

		resource.set('dive_role_id', diveRoleId);
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},	
	
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(diveGroupParticipantId) {
		var self = this,
			resource = JustDive.restControllers.dive_group_participants.findObject(diveGroupParticipantId);
		resource.destroyResource()
			.done( function() {
				self.getRestController().removeObject(resource);
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	}
});