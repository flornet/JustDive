#= require ../controllers.js

JustDive.Controllers.Boat = JustDive.ArrayController.create({
	content: [],

/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		router.set('location', 'club-admin/boats/' + event.context.id);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var boat = view.boat,
			router = JustDive.router;
		boat.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				JustDive.restControllers.boats.pushObject(boat);
				router.set('location', 'club-admin/boats/' + boat.id);
			});
	}, 
	
/**
    Update action: save the updated 'model'
*/ 
	update: function(view) {
		var boat = view.boat;
		boat.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				view.set('boat', boat);
				view.setShowing();
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var boat = view.boat,
			router = JustDive.router;
		boat.destroyResource()
			.done( function() {
				JustDive.restControllers.boats.removeObject(boat);
				router.set('location', 'club-admin/boats');
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	}
});