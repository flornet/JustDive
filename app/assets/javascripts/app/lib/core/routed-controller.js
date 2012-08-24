#= require ./array-controller.js
JustDive.RoutedController = JustDive.ArrayController.extend({
	content: 		[],
	mainRoute: 		'',
	resourceName: 	'',
	
	getRestController: function() {
		return false;
	},

/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		router.set('location', this.get('mainRoute') + '/' + event.context.id);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var self = this,
			resource = view.get(this.get('resourceName')),
			router = JustDive.router;
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				self.getRestController().pushObject(resource);
				router.set('location', self.get('mainRoute') + '/' + resource.id);
			});
	}, 
	
/**
    Update action: save the updated 'model'
*/ 
	update: function(view) {
		var self = this,
			resource = view.get(this.get('resourceName'));
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				view.set(self.get('resourceName'), resource);
				view.setShowing();
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var self = this,
			resource = view.get(this.get('resourceName')),
			router = JustDive.router;
		resource.destroyResource()
			.done( function() {
				self.getRestController().removeObject(resource);
				router.set('location', self.get('mainRoute'));
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	}
});
