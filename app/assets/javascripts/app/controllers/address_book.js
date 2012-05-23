JustDive.addressBookController = JustDive.ArrayController.create({
  content: [],
  
  _initViews: function() {
		if (this.views === undefined) {
			this.views = {
							divers_list: 	JustDive.views.divers.list.create(),
							diver_detail:	JustDive.views.divers.detail.create()
						};
		}
	},
  
  index: function() {
    this._initViews();
    this.views.divers_list.appendTo(JustDive.viewsContainer);
    JustDive.controllers.divers.findAll();
  },
  
  show: function(diver, isEdit) {
	var controller = this;
	if (diver.context) diver = diver.context; // Requested by Handlebars template ie. {{action "show" context="diver"}}
	diver.findResource()
		.fail( function(e) {
		  JustDive.displayError('jqXHR', e);
		})
		.done(function() {
		  // Next goes here
		  controller._initViews();
		  if (!controller.views.diver_detail.isAppened) {
			controller.views.diver_detail.appendTo(JustDive.viewsContainer);
			controller.views.diver_detail.set('isAppened', true);
		  }
		  if (isEdit === true) {
			controller.views.diver_detail.set('isEditing', true);
		  } else {
			controller.views.diver_detail.set('isEditing', false);
		  }
		  controller.views.diver_detail.set('diver', diver);
		});
  },
  
  edit: function(diver) {
	this.show(diver, true);
  },
  
  update: function(diver) {
	var controller = this;
	if (diver.context) diver = diver.context; // Requested by Handlebars template ie. {{action "show" context="diver"}}
	console.log(diver);
	diver.saveResource()
		.fail( function(e) {
		  JustDive.displayError('jqXHR', e);
		})
		.done(function() {
		  // Next goes here
		  console.log('done');
		});
  },
  
  destroy: function(diver) {
	if (diver.context) diver = diver.context;
	diver.destroyResource()
		.fail( function(e) {
			JustDive.displayError('jqXHR', e);
		})
		.done( function() {
			JustDive.controllers.divers.removeObject(diver);
		});
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