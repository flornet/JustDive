#= require ../boat-departures.js

JustDive.Views.BoatDepartures.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/boat-departures/detail',
  classNames:   ['boat-departure-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.BoatDeparture;
  }
});