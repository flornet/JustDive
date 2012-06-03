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
		this.views.divers_list.appendTo(JustDive.viewsContainer);
		JustDive.restControllers.divers.findAll();
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
			diver = JustDive.models.diver.create();
		controller._initViews();
		controller._appendView(view);
		view.set('isCreating', true);
		view.set('isEditing', true);
		view.set('diver', diver);
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
  /*
  loadPage: function() {
	var diver = JustDive.Diver.create({ firstname: 'Florent', lastname: 'Jaouali'});
	this.pushObject(diver);
	JustDive.Storage.create(diver);
  },
  
  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title }),
    stats = document.getElementById('stats-area');
    this.pushObject(todo);
    Todos.TodoStore.create(todo);

    (stats.style.display=='block')? stats.style.display = 'inline' : stats.style.display = 'block';
  },

  pushObject: function (item, ignoreStorage) {
    if (!ignoreStorage)
      JustDive.Storage.create(item);
    return this._super(item);
  },

  removeObject: function (item) {
    Todos.TodoStore.remove(item);
    return this._super(item);
  },

  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  completed: function() {
    return this.filterProperty('isDone', true).get('length');
  }.property('@each.isDone'),

  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);

      return value;
    } else {
      return !!this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone'),

  completeClass: function () {
    return this.get('completed') < 1 ? 'none-completed' : 'some-completed';
  }.property('@each.isDone')
  */
});