#= require ./crud-form-view.js

JustDive.Modal = JustDive.CrudFormView.extend( 
  /** @scope JustDive.Modal.prototype */ {

  classNames: ['modal hide'],
  tagName: "div",
  didInsertElement: function() {
	this._super();
	$(this.get('element')).modal();
  }
});