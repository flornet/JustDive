#= require ../controllers.js

JustDive.Controllers.AddressBook = JustDive.ArrayController.create({
	content: [],

/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		router.set('location', 'address-book/' + event.context.id);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var diver = view.diver,
			router = JustDive.router;
		diver.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				JustDive.restControllers.divers.pushObject(diver);
				router.set('location', 'address-book/' + diver.id);
			});
	}, 
	
/**
    Update action: save the updated 'model'
*/ 
	update: function(view) {
		var diver = view.diver;
		diver.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				view.set('diver', diver);
				view.setShowing();
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var diver = view.diver,
			router = JustDive.router;
		diver.destroyResource()
			.done( function() {
				JustDive.restControllers.divers.removeObject(diver);
				router.set('location', 'address-book');
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	}
});