#= require ../controllers.js

JustDive.Controllers.AddressBook = JustDive.ArrayController.create({
	content: [],

	_initViews: function() {
		if (this.views === undefined) {
			this.views = {
							divers_list: 	JustDive.Views.Divers.List.create(),
							diver_detail:	JustDive.Views.Divers.Detail.create()
						};
		}
	},

/**
    Index action: loads the data and appends the view
*/
	index: function() {
		this._initViews();
		this.views.divers_list.replaceIn(JustDive.leftPanelContainer);
	},

/**
    Show action: loads the data and appends the view
*/
	show: function(diver) {
		var controller = this,
			view = this.views.diver_detail;
		if (diver.context) diver = diver.context; // Requested by Handlebars template ie. {{action "show" context="diver"}}
		diver.findResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				// Next goes here
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', false);
				view.set('isCreating', false);
				view.set('diver', diver);
			});
	},
	
/**
    New action: creates an empty 'model' and appends the view
*/
	new: function() {
		var controller = this,
			view = this.views.diver_detail,
			diver = JustDive.Models.Diver.create();
		controller._initViews();
		controller._appendView(view);
		view.set('isCreating', true);
		view.set('isEditing', true);
		view.set('diver', diver);
	},
	
/**
    Create action: save the newly created 'model'
*/   
	create: function(diver) {
		var controller = this,
			view = this.views.diver_detail;
		if (diver.context) diver = diver.context;
		diver.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done( function() {
				JustDive.restControllers.divers.pushObject(diver);
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', false);
				view.set('isCreating', false);
				view.set('diver', diver);
			});
	}, 
 
/**
    Edit action: loads the data and appends the view
*/ 
  	edit: function(diver) {
		var controller = this,
			view = this.views.diver_detail;
		if (diver.context) diver = diver.context;
		diver.findResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', true);
				view.set('isCreating', false);
				view.set('diver', diver);
			});
	},
	
/**
    Update action: save the updated 'model'
*/ 
	update: function(diver) {
		var controller = this,
			view = this.views.diver_detail;
		if (diver.context) diver = diver.context;
		diver.saveResource()
			.fail( function(e) {
				JustDive.displayError('jqXHR', e);
			})
			.done(function() {
				controller._initViews();
				controller._appendView(view);
				view.set('isEditing', false);
				view.set('isCreating', false);
				view.set('diver', diver);
			});
	},
/**
    Destroy action: destroy the 'model'
*/  
	destroy: function(diver) {
		var controller = this,
			view = this.views.diver_detail;
		if (diver.context) diver = diver.context;
		diver.destroyResource()
			.done( function() {
				if (view.get('diver') === diver) {
					view.destroy();
				}
				JustDive.restControllers.divers.removeObject(diver);
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