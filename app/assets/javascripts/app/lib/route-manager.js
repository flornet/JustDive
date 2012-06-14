#= require ../views/layouts/fullscreen.js
#= require ../views/layouts/split-screen.js
#= require ../views/identity/new.js
#= require ../views/identity/offline.js
#= require ../views/identity/welcome.js
#= require ../views/address-book/index.js
#= require ../views/divers/list.js
#= require ../views/divers/list-show.js
#= require ../views/divers/detail.js
#= require ../views/club-admin/index.js
#= require ../views/club-admin/list.js
#= require ../views/dive-roles/list.js
#= require ../views/dive-roles/list-show.js
#= require ../views/dive-roles/detail.js
#= require ../views/boats/list.js
#= require ../views/boats/list-show.js
#= require ../views/boats/detail.js
#= require ../views/dive-events/index.js
#= require ../views/dive-events/list.js
#= require ../views/dive-events/list-show.js
#= require ../views/dive-events/detail.js

JustDive.RouteManager = Ember.RouteManager.extend({
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
							route: 	'welcome',
							viewClass: 	JustDive.Views.Identity.Welcome
	})
  }),
  
  clubAdmin: JustDive.LayoutState.create({
	route: 		'club-admin',
	viewClass: 	JustDive.Views.Layouts.SplitScreen,
	leftPanel:  JustDive.Views.ClubAdmin.List,
	
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
	})
  }),
  
  addressBook: JustDive.LayoutState.create({
	route: 		'address-book',
	viewClass: 	JustDive.Views.Layouts.SplitScreen,
	leftPanel:  JustDive.Views.Divers.List,
	
	index:				JustDive.LayoutState.create({
							viewClass: JustDive.Views.AddressBook.Index
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
							viewClass: JustDive.Views.Divers.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var diverId = stateManager.getPath('params.id');
								var diver = JustDive.restControllers.divers.findObject(diverId);
								if (diver !== false) {
									view.set('diver', diver);
									view.setShowing();
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
	
	index:				JustDive.LayoutState.create({
							viewClass: JustDive.Views.DiveEvents.Index
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
							route: 	':id',
							viewClass: JustDive.Views.DiveEvents.Detail,
							enter: function(stateManager, transition) {
								this._super(stateManager, transition);
								var view = this.get('view');
								var diveEventId = stateManager.getPath('params.id');
								var diveEvent = JustDive.restControllers.dive_events.findObject(diveEventId);
								if (diveEvent !== false) {
									view.set('diveEvent', diveEvent);
									view.setShowing();
								} else {
									JustDive.router.set('location', 'dive-events');
								}
							}
	})
  })
});