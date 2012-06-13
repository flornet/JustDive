#= require ../controllers.js

JustDive.Controllers.DiveRole = JustDive.ArrayController.create({
	content: [],

/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		router.set('location', 'club-admin/dive-roles/' + event.context.id);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var diveRole = view.diveRole,
			router = JustDive.router;
		diveRole.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				JustDive.restControllers.dive_roles.pushObject(diveRole);
				router.set('location', 'club-admin/dive-roles/' + diveRole.id);
			});
	}, 
	
/**
    Update action: save the updated 'model'
*/ 
	update: function(view) {
		var diveRole = view.diveRole;
		diveRole.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				view.set('diveRole', diveRole);
				view.setShowing();
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var diveRole = view.diveRole,
			router = JustDive.router;
		diveRole.destroyResource()
			.done( function() {
				JustDive.restControllers.dive_roles.removeObject(diveRole);
				router.set('location', 'club-admin/dive-roles');
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	}
});