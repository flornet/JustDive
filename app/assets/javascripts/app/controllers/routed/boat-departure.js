#= require ../routed.js

JustDive.Controllers.Routed.BoatDeparture = JustDive.RoutedController.create({
	mainRoute: 		'dive-events/:id/boat-departures',
	resourceName: 	'boatDeparture',
	
	getRestController: function() {
		return JustDive.restControllers.boat_departures;
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
	create: function(boatDeparture, diveEvent) {
		var resource = boatDeparture,
			diveEventId = diveEvent.id,
			self = this;
		if (diveEventId.length !== 36) {
			diveEventId = parseInt(diveEventId);
		}
		resource.set('dive_event_id', diveEventId); // Refreshes the dive_event_id since it might have changed
		resource.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				self.getRestController().pushObject(resource);
			});
	}, 
	
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(view) {
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', view.get(this.get('resourceName')).dive_event_id);
		newMainRoute = newMainRoute.replace('/boat-departures', '');
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}
});