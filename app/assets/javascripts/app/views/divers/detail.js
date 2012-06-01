#= require ../divers.js

JustDive.Views.Divers.Detail = JustDive.View.extend({
  templateName: 'app/templates/divers/detail',
  classNames:   ['detail-diver'],
  tagName:    	'form',
  error: 		'',
  
  destroy: function(event) {
	if (event) event.preventDefault();
	this.set('isAppened', false);
	this.remove();
  },
  
  submit: function(event) {
    event.preventDefault();
	if (this.get('isCreating')) {
		JustDive.Controllers.AddressBook.create(this.diver);
	} else {
		JustDive.Controllers.AddressBook.update(this.diver);
	}
  }
});