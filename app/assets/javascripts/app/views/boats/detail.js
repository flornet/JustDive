#= require ../boats.js

JustDive.Views.Boats.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/boats/detail',
  classNames:   ['boat-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.Boat;
  }
});