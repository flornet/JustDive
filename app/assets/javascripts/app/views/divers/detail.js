JustDive.views.divers.detail = JustDive.View.extend({
  templateName: 'app/templates/divers/detail',
  classNames:   ['detail-diver'],
  tagName:    	'form',
  error: 		'',
  
  destroy: function(event) {
	event.preventDefault();
	this.set('isAppened', false);
	this.remove();
  },
  
  submit: function(event) {
	console.log(this.diver);
    event.preventDefault();
	JustDive.addressBookController.update(this.diver);
  }
});