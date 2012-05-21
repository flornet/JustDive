JustDive.addressBookController = JustDive.ArrayController.create({
  content: [],

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
});