#= require ../routed.js

JustDive.Controllers.Routed.BoatDeparture = JustDive.RoutedController.create({
	mainRoute: 		'dive-events/:id/boat-departures',
	resourceName: 	'boatDeparture',
	
	getRestController: function() {
		return JustDive.restControllers.boat_departures;
	},
	
/**
    New action: loads the data and appends the view
*/
	new: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		var mainRoute = this.get('mainRoute');
		mainRoute = mainRoute.replace(':id', event.context.id);
		this.set('mainRoute', mainRoute);
		router.set('location', this.get('mainRoute') + '/new');
	},
/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var mainRoute = this.get('mainRoute');
		mainRoute = mainRoute.replace(':id', event.context.dive_event_id);
		this.set('mainRoute', mainRoute);
		this._super(event);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var mainRoute = this.get('mainRoute');
		mainRoute = mainRoute.replace(':id', view.get(this.get('resourceName')).dive_event_id);
		this.set('mainRoute', mainRoute);
		this._super(view);
	}, 
	
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var mainRoute = this.get('mainRoute');
		mainRoute = mainRoute.replace(':id', view.get(this.get('resourceName')).dive_event_id);
		this.set('mainRoute', mainRoute);
		this._super(view);
	}
});