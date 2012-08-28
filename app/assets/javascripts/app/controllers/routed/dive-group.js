#= require ../routed.js

JustDive.Controllers.Routed.DiveGroup = JustDive.RoutedController.create({
	mainRoute: 		'dive-events/:id/boat-departures/:boat_departure_id/dive-groups',
	resourceName: 	'diveGroup',
	
	getRestController: function() {
		return JustDive.restControllers.dive_groups;
	},
/**
    New action: loads the data and appends the view
*/
	new: function(event) {
		var router = JustDive.router;
		event.preventDefault();
		var mainRoute = this.get('mainRoute');
		var newMainRoute = mainRoute.replace(':id', event.context.dive_event_id);
		newMainRoute = newMainRoute.replace(':boat_departure_id', event.context.id);
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
		event.context = event.context.diveGroup;
		this.set('mainRoute', newMainRoute);
		this._super(event);
		this.set('mainRoute', mainRoute);
	},

/**
    Create action: save the newly created 'model'
*/   
	create: function(event) {
		event.preventDefault();
		var boatDepartureId = event.context.id;
		if (boatDepartureId.length !== 36) {
			boatDepartureId = parseInt(boatDepartureId);
		}
		var resource = JustDive.Models.DiveGroup.create({boat_departure_id: boatDepartureId}),
			self = this;
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
		var newMainRoute = mainRoute.replace(':id', view.boatDeparture.dive_event_id);
		newMainRoute = newMainRoute.replace(':boat_departure_id', view.boatDeparture.id);
		newMainRoute = newMainRoute.replace('/dive-groups', '');
		this.set('mainRoute', newMainRoute);
		this._super(view);
		this.set('mainRoute', mainRoute);
	}
});