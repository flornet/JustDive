#= require ../routed.js

JustDive.Controllers.Routed.DiveGroupParticipant = JustDive.RoutedController.create({
	mainRoute: 		'dive-events/:id/boat-departures/:boat_departure_id/dive-groups/:dive_group_id/participants',
	resourceName: 	'diveGroupParticipant',
	
	getRestController: function() {
		return JustDive.restControllers.dive_group_participants;
	},
/**
    New action: loads the data and appends the view
*/
	new: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		var mainRoute = this.get('mainRoute');
		mainRoute = mainRoute.replace(':id', event.context.dive_event_id);
		mainRoute = mainRoute.replace(':boat_departure_id', event.context.id);
		this.set('mainRoute', mainRoute);
		router.set('location', this.get('mainRoute') + '/new');
	},
/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var mainRoute = this.get('mainRoute');
		mainRoute = mainRoute.replace(':id', event.context.boatDeparture.dive_event_id);
		mainRoute = mainRoute.replace(':boat_departure_id', event.context.boatDeparture.id);
		event.context = event.context.diveGroup;
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