#= require ../dive-group-participants.js

JustDive.Views.DiveGroupParticipants.Detail = JustDive.Modal.extend({
  templateName: 'app/templates/dive-group-participants/detail',
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.DiveGroupParticipant;
  },
  
  stopEditMode: function(event) {
	if (event) event.preventDefault();
  }
});