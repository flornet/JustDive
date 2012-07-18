#= require ../dive-event-participants.js

JustDive.Views.DiveEventParticipants.ListShow = JustDive.CrudFormView.extend({
  templateName: 'app/templates/dive-event-participants/list-show',
  tagName:    	'tr',
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.DiveEventParticipant;
  }
});