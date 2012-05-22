JustDive.NewIdentityView = JustDive.View.extend({
  templateName:			'app/templates/identity/new',
  tagName:    			'form',
  error: 				'',

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  submit: function(event) {
    event.preventDefault();
	JustDive.identityController.login();
  }
});