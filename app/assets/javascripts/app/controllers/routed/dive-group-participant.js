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
		
		// Handling Update as Delete+Create because Ember seems to have hard time updating views with complex bindings
		/*
		var diverId = resource.get('diver_id');
		resource.destroyResource()
			.done( function() {
				self.getRestController().removeObject(resource);
				self.create(diverId, diveGroupId);
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
		
		/* */
		// (Almost) Working code (dirty) with a normal Update
		resource.set('dive_group_id', diveGroupId);
		var oldContent = JustDive.restControllers.dive_group_participants.get('content');
		JustDive.restControllers.dive_group_participants.replaceContent(0, oldContent.get('length'), oldContent);
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				
			});
		//*/
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