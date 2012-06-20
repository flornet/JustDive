#= require ../dive-group-participants.js

JustDive.Views.DiveGroupParticipants.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/dive-group-participants/detail',
  classNames:   ['dive-group-participant-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.DiveGroupParticipant;
  }
});