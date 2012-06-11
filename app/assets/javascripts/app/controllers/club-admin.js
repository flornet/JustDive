#= require ../controllers.js

JustDive.Controllers.ClubAdmin = JustDive.ArrayController.create({
	content: [],

	_initViews: function() {
		if (this.views === undefined) {
			this.views = {
							club_admin_list: 	JustDive.Views.ClubAdmin.List.create(),
							dive_roles_list:	JustDive.Views.DiveRoles.List.create(),
							dive_role_detail:	JustDive.Views.DiveRoles.Detail.create()
						};
		}
	},

/**
    Index action: loads the data and appends the view
*/
	index: function() {
		this._initViews();
		this.views.club_admin_list.replaceIn(JustDive.leftPanelContainer);
	},
	
/**
    Index action: loads the data and appends the view
*/
	diveRolesIndex: function() {
		this._initViews();
		this._appendView(this.views.dive_roles_list);
	},

/**
    Show action: loads the data and appends the view
*/
	diveRolesShow: function(dive_role) {
		var controller = this,
			view = this.views.dive_role_detail;
		if (dive_role.context) dive_role = dive_role.context; // Requested by Handlebars template ie. {{action "show" context="dive_role"}}
		dive_role.findResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				// Next goes here
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', false);
				view.set('isCreating', false);
				view.set('diveRole', dive_role);
			});
	},
	
/**
    New action: creates an empty 'model' and appends the view
*/
	diveRolesNew: function() {
		var controller = this,
			view = this.views.dive_role_detail,
			dive_role = JustDive.Models.DiveRole.create();
		controller._initViews();
		controller._appendView(view);
		view.set('isCreating', true);
		view.set('isEditing', true);
		view.set('diveRole', dive_role);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	diveRolesCreate: function(dive_role) {
		var controller = this,
			view = this.views.dive_role_detail;
		if (dive_role.context) dive_role = dive_role.context;
		dive_role.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				JustDive.restControllers.dive_roles.pushObject(dive_role);
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', false);
				view.set('isCreating', false);
				view.set('diveRole', dive_role);
			});
	}, 
 
/**
    Edit action: loads the data and appends the view
*/ 
  	diveRolesEdit: function(dive_role) {
		var controller = this,
			view = this.views.dive_role_detail;
		if (dive_role.context) dive_role = dive_role.context;
		dive_role.findResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', true);
				view.set('isCreating', false);
				view.set('diveRole', dive_role);
			});
	},
	
/**
    Update action: save the updated 'model'
*/ 
	diveRolesUpdate: function(dive_role) {
		var controller = this,
			view = this.views.dive_role_detail;
		if (dive_role.context) dive_role = dive_role.context;
		dive_role.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', false);
				view.set('isCreating', false);
				view.set('diveRole', dive_role);
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	diveRolesDestroy: function(dive_role) {
		var controller = this,
			view = this.views.dive_role_detail;
		if (dive_role.context) dive_role = dive_role.context;
		dive_role.destroyResource()
			.done( function() {
				if (view.get('diveRole') === dive_role) {
					view.destroy();
				}
				JustDive.restControllers.dive_roles.removeObject(dive_role);
			})
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			});
	},
	
	_appendView: function(view) {
		if (!view.isAppened) {
			view.appendTo(JustDive.viewsContainer);
			view.set('isAppened', true);
		}
	}
});