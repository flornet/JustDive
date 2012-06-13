#= require ../divers.js

JustDive.Views.Divers.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/divers/detail',
  classNames:   ['diver-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.AddressBook;
  }
});