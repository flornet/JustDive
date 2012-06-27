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
		var newMainRoute = mainRoute.replace(':id', event.context.diveEvent.id);
		newMainRoute = newMainRoute.replace(':boat_departure_id', event.context.boatDeparture.id);
		newMainRoute = newMainRoute.replace(':dive_group_id', event.context.diveGroup.id);
		this.set('mainRoute', newMainRoute);
		router.set('location', this.get('mainRoute') + '/new');
		this.set('mainRoute', mainRoute);
	},
/**
    Show action: loads the data and appends the view
*/
	show: function(event) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', event.context.boatDeparture.dive_event_id);
		newMainRoute = newMainRoute.replace(':boat_departure_id', event.context.boatDeparture.id);
		newMainRoute = newMainRoute.replace(':dive_group_id', event.context.diveGroup.id);
		event.context = event.context.diveGroupParticipant;
		this.set('mainRoute', newMainRoute);
		this._super(event);
		this.set('mainRoute', mainRoute);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(view) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', view.boatDeparture.dive_event_id);
		newMainRoute = newMainRoute.replace(':boat_departure_id', view.boatDeparture.id);
		newMainRoute = newMainRoute.replace(':dive_group_id', view.diveGroup.id);
		view.diveGroupParticipant.set('dive_group_id', view.diveGroup.id); // Refreshes the dive_group_id since it might have changed
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}, 
	
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', view.boatDeparture.dive_event_id);
		newMainRoute = newMainRoute.replace(':boat_departure_id', view.boatDeparture.id);
		newMainRoute = newMainRoute.replace(':dive_group_id', view.diveGroupParticipant.dive_group_id);
		newMainRoute = newMainRoute.replace('/participants', '');
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}
});