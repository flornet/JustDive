#= require ./view.js
JustDive.CrudFormView = JustDive.View.extend({
  tagName:    	'form',
  unfocussableClassName: 'no-focus', 
  error: 		'',
  isCreating:	false,
  isEditing:	false,
  isShowing:	false,
  
  getCrudController: function() {
	return false;
  },
  
  isValid: function() {
	return true;
  },
  
  setCreating: function() {
	this.set('isCreating', true);
	this.set('isEditing', true);
	this.set('isShowing', false);
  },
  
  setEditing: function() {
	this.set('isEditing', true);
	this.set('isCreating', false);
	this.set('isShowing', false);
  },
  
  setShowing: function() {
	this.set('isShowing', true);
	this.set('isEditing', false);
	this.set('isCreating', false);
  },
  
  stopEditMode: function(event) {
	if (event) event.preventDefault();
	this.setShowing();
  },
  
  startEditMode: function(event) {
	if (event) event.preventDefault();
	this.setEditing();
  },
  
  submit: function(event) {
    event.preventDefault();
	if (this.isValid()) {
		if (this.get('isCreating')) {
			this.getCrudController().create(this);
		} else {
			this.getCrudController().update(this);
		}
	}
  },
  
  destroyObject: function(event) {
	event.preventDefault();
	this.getCrudController().destroy(this);
  },
  
  didInsertElement: function() {
	var firstInput = this.$('input:first');
	if (!firstInput.hasClass(this.unfocussableClassName)) {
		firstInput.focus();
	}
  }
});