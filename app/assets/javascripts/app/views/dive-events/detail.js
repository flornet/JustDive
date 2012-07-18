#= require ../dive-events.js

JustDive.Views.DiveEvents.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/dive-events/detail',
  classNames:   ['dive-event-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.DiveEvent;
  },
  
  isValid: function() {
	var result = this.get('diveEvent').validateData();
	this.set('error', result.errors.join('<br />'));
	return result.isValid;
  }
});