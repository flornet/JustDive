#= require ../views/layouts/fullscreen.js
#= require ../views/layouts/split-screen.js
#= require ../views/errors/index.js
#= require ../views/identity/new.js
#= require ../views/identity/offline.js
#= require ../views/identity/welcome.js
#= require ../views/address-book/index.js
#= require ../views/divers/left-nav.js
#= require ../views/divers/list.js
#= require ../views/divers/list-show.js
#= require ../views/divers/detail.js
#= require ../views/club-admin/index.js
#= require ../views/club-admin/left-nav.js
#= require ../views/club-admin/list.js
#= require ../views/dive-roles/list.js
#= require ../views/dive-roles/list-show.js
#= require ../views/dive-roles/detail.js
#= require ../views/boats/list.js
#= require ../views/boats/list-show.js
#= require ../views/boats/detail.js
#= require ../views/ffessm-levels/list.js
#= require ../views/ffessm-levels/list-show.js
#= require ../views/ffessm-levels/detail.js
#= require ../views/dive-events/index.js
#= require ../views/dive-events/left-nav.js
#= require ../views/dive-events/list.js
#= require ../views/dive-events/detail.js
#= require ../views/boat-departures/detail.js
#= require ../views/dive-groups/detail.js

JustDive.RouteManager = Ember.RouteManager.extend({
  error: JustDive.LayoutState.create({
	route: 		'errors',
	viewClass: 	JustDive.Views.Layouts.Fullscreen,
	index:				JustDive.LayoutState.create({
							viewClass: JustDive.Views.Errors.Index,
							navItemClass:	'errors',
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								JustDive.mainNav.activate(this.get('navItemClass'));
							}
	})
  }),
  
  account: JustDive.LayoutState.create({
	route: 		'account',
	viewClass: 	JustDive.Views.Layouts.Fullscreen,
	
	login: 				JustDive.LayoutState.create({
							route: 	'login',
							viewClass: 	JustDive.Views.Identity.New
	}),
	
	networkRequired: 	JustDive.LayoutState.create({
							route: 	'network-required',
							viewClass: 	JustDive.Views.Identity.Offline
	}),
	
	welcome: 			JustDive.LayoutState.create({
							route: 			'welcome',
							navItemClass:	'welcome',
							viewClass: 		JustDive.Views.Identity.Welcome,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								JustDive.mainNav.activate(this.get('navItemClass'));
							}
	})
  }),
  
  clubAdmin: JustDive.LayoutState.create({
	route: 		'club-admin',
	viewClass: 	JustDive.Views.Layouts.SplitScreen,
	leftPanel:  JustDive.Views.ClubAdmin.List,
	leftNav:	JustDive.Views.ClubAdmin.LeftNav,
	
	index:				JustDive.LayoutState.create({
							viewClass: JustDive.Views.ClubAdmin.Index
	}),
	
	diveRoles:			JustDive.LayoutState.create({
							route: 	'dive-roles',
							viewClass: JustDive.Views.DiveRoles.List
	}),
	
	diveRolesNew:		JustDive.LayoutState.create({
							route: 	'dive-roles/new',
							viewClass: JustDive.Views.DiveRoles.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								this.get('view').set('diveRole', JustDive.Models.DiveRole.create());
								this.get('view').setCreating();
							}
	}),
	diveRolesShow:		JustDive.LayoutState.create({
							route: 	'dive-roles/:id',
							viewClass: JustDive.Views.DiveRoles.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var diverRoleId = stateManager.getPath('params.id');
								var diveRole = JustDive.restControllers.dive_roles.findObject(diverRoleId);
								if (diveRole !== false) {
									view.set('diveRole', diveRole);
									view.setShowing();
								} else {
									JustDive.router.set('location', 'club-admin/dive-roles');
								}
							}
	}),
	boats:			JustDive.LayoutState.create({
							route: 	'boats',
							viewClass: JustDive.Views.Boats.List
	}),
	
	boatsNew:		JustDive.LayoutState.create({
							route: 	'boats/new',
							viewClass: JustDive.Views.Boats.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								this.get('view').set('boat', JustDive.Models.Boat.create());
								this.get('view').setCreating();
							}
	}),
	boatsShow:		JustDive.LayoutState.create({
							route: 	'boats/:id',
							viewClass: JustDive.Views.Boats.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var boatId = stateManager.getPath('params.id');
								var boat = JustDive.restControllers.boats.findObject(boatId);
								if (boat !== false) {
									view.set('boat', boat);
									view.setShowing();
								} else {
									JustDive.router.set('location', 'club-admin/boats');
								}
							}
	}),
	ffessmLevels:		JustDive.LayoutState.create({
							route: 	'ffessm-levels',
							viewClass: JustDive.Views.FfessmLevels.List
	}),
	
	ffessmLevelsNew:	JustDive.LayoutState.create({
							route: 	'ffessm-levels/new',
							viewClass: JustDive.Views.FfessmLevels.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								this.get('view').set('ffessmLevel', JustDive.Models.FfessmLevel.create());
								this.get('view').setCreating();
							}
	}),
	ffessmLevelsShow:	JustDive.LayoutState.create({
							route: 	'ffessm-levels/:id',
							viewClass: JustDive.Views.FfessmLevels.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var ffessmLevelId = stateManager.getPath('params.id');
								var ffessmLevel = JustDive.restControllers.ffessm_levels.findObject(ffessmLevelId);
								if (ffessmLevel !== false) {
									view.set('ffessmLevel', ffessmLevel);
									view.setShowing();
								} else {
									JustDive.router.set('location', 'club-admin/ffessm-levels');
								}
							}
	})
  }),
  
  addressBook: JustDive.LayoutState.create({
	route: 		'address-book',
	viewClass: 	JustDive.Views.Layouts.SplitScreen,
	leftPanel:  JustDive.Views.Divers.List,
	leftNav:	JustDive.Views.Divers.LeftNav,
	
	index:				JustDive.LayoutState.create({
							viewClass: 		JustDive.Views.AddressBook.Index,
							navItemClass: 	'addressBook',
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								JustDive.mainNav.activate(this.get('navItemClass'));
								JustDive.subNav.activate('fake');
							}
	}),
	
	new:				JustDive.LayoutState.create({
							route: 	'new',
							viewClass: JustDive.Views.Divers.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								this.get('view').set('diver', JustDive.Models.Diver.create());
								this.get('view').setCreating();
							}
	}),
	
	show:				JustDive.LayoutState.create({
							route: 	':id',
							subnavItemClassPrefix: 	'diver-',
							viewClass: JustDive.Views.Divers.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var diverId = stateManager.getPath('params.id');
								var diver = JustDive.restControllers.divers.findObject(diverId);
								if (diver !== false) {
									view.set('diver', diver);
									view.setShowing();
									JustDive.subNav.activate(this.get('subnavItemClassPrefix') + diverId);
								} else {
									JustDive.router.set('location', 'address-book');
								}
							}
	})
  }),
  
  diveEvents: JustDive.LayoutState.create({
	route: 		'dive-events',
	viewClass: 	JustDive.Views.Layouts.SplitScreen,
	leftPanel:  JustDive.Views.DiveEvents.List,
	leftNav:	JustDive.Views.DiveEvents.LeftNav,
	
	index:				JustDive.LayoutState.create({
							viewClass: 		JustDive.Views.DiveEvents.Index,
							navItemClass: 	'events',
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								JustDive.mainNav.activate(this.get('navItemClass'));
								JustDive.subNav.activate('fake');
							}
	}),
	
	new:				JustDive.LayoutState.create({
							route: 	'new',
							viewClass: JustDive.Views.DiveEvents.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								this.get('view').set('diveEvent', JustDive.Models.DiveEvent.create());
								this.get('view').setCreating();
							}
	}),
	
	show:				JustDive.LayoutState.create({
							route: 					':id',
							subnavItemClassPrefix: 	'event-',
							viewClass: JustDive.Views.DiveEvents.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var diveEventId = stateManager.getPath('params.id');
								var diveEvent = JustDive.restControllers.dive_events.findObject(diveEventId);
								if (diveEvent !== false) {
									view.set('diveEvent', diveEvent);
									view.setShowing();
									JustDive.subNav.activate(this.get('subnavItemClassPrefix') + diveEventId);
								} else {
									JustDive.router.set('location', 'dive-events');
								}
							}
	}),
	boatDepartureNew:	JustDive.LayoutState.create({
							route: 	':id/boat-departures/new',
							viewClass: JustDive.Views.BoatDepartures.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var diveEventId = stateManager.getPath('params.id'),
									diveEvent 	= JustDive.restControllers.dive_events.findObject(diveEventId);
								if (diveEvent !== false) {
									this.get('view').set('diveEvent', diveEvent);
									this.get('view').set('boatDeparture', JustDive.Models.BoatDeparture.create({dive_event_id: diveEvent.id}));
									this.get('view').setCreating();
								} else {
									JustDive.router.set('location', 'dive-events');
								}
								
							}
	}),
	boatDepartureShow:				JustDive.LayoutState.create({
							route: 	':id/boat-departures/:boat_departure_id',
							viewClass: JustDive.Views.BoatDepartures.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view 			= this.get('view'),
									diveEventId 	= stateManager.getPath('params.id'),
									boatDepartureId = stateManager.getPath('params.boat_departure_id'),
									diveEvent 		= JustDive.restControllers.dive_events.findObject(diveEventId),
									boatDeparture 	= JustDive.restControllers.boat_departures.findObject(boatDepartureId);
								if ((diveEvent !== false) && (boatDeparture !== false)) {
									view.set('diveEvent', diveEvent);
									view.set('boatDeparture', boatDeparture);
									view.setShowing();
								} else {
									JustDive.router.set('location', 'dive-events');
								}
							}
	}),
	diveGroupNew:		JustDive.LayoutState.create({
							route: 	':id/boat-departures/:boat_departure_id/dive-groups/new',
							viewClass: JustDive.Views.DiveGroups.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var diveEventId 	= stateManager.getPath('params.id'),
									boatDepartureId = stateManager.getPath('params.boat_departure_id'),
									diveEvent 		= JustDive.restControllers.dive_events.findObject(diveEventId),
									boatDeparture 	= JustDive.restControllers.boat_departures.findObject(boatDepartureId);
								if ((diveEvent !== false) && (boatDeparture !== false)) {
									this.get('view').set('diveEvent', diveEvent);
									this.get('view').set('boatDeparture', boatDeparture);
									this.get('view').set('diveGroup', JustDive.Models.DiveGroup.create({boat_departure_id: boatDeparture.id}));
									this.get('view').setCreating();
								} else {
									JustDive.router.set('location', 'dive-events');
								}
								
							}
	}),
	diveGroupShow:				JustDive.LayoutState.create({
							route: 	':id/boat-departures/:boat_departure_id/dive-groups/:dive_group_id',
							viewClass: JustDive.Views.DiveGroups.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var diveEventId = stateManager.getPath('params.id');
								var boatDepartureId = stateManager.getPath('params.boat_departure_id');
								var diveGroupId = stateManager.getPath('params.dive_group_id');
								var diveEvent = JustDive.restControllers.dive_events.findObject(diveEventId);
								var boatDeparture = JustDive.restControllers.boat_departures.findObject(boatDepartureId);
								var diveGroup = JustDive.restControllers.dive_groups.findObject(diveGroupId);
								if ((diveEvent !== false) && (boatDeparture !== false) && (diveGroup !== false)) {
									view.set('diveEvent', diveEvent);
									view.set('boatDeparture', boatDeparture);
									view.set('diveGroup', diveGroup);
									view.setShowing();
								} else {
									JustDive.router.set('location', 'dive-events');
								}
							}
	})
  })
});