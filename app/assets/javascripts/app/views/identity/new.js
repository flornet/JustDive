JustDive.NewIdentityView = JustDive.View.extend({
  templateName:			'app/templates/identity/new',
  tagName:    			'form',
  
  init: function() {
    this._super();
  },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  submit: function(event) {
    event.preventDefault();
	JustDive.identity.save();
  }
});