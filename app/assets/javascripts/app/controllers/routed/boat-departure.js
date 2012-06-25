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
		var newMainRoute = mainRoute.replace(':id', event.context.id);
		this.set('mainRoute', newMainRoute);
		router.set('location', this.get('mainRoute') + '/new');
		this.set('mainRoute', mainRoute);
	},
/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', event.context.diveEvent.id);
		event.context = event.context.boatDeparture;
		this.set('mainRoute', newMainRoute);
		this._super(event);
		this.set('mainRoute', mainRoute);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', view.get(this.get('resourceName')).dive_event_id);
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}, 
	
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', view.get(this.get('resourceName')).dive_event_id);
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}
});