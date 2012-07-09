#= require ../dive-event-participants.js

JustDive.Views.DiveEventParticipants.ListShow = JustDive.View.extend({
  templateName: 'app/templates/dive-event-participants/list-show',
  tagName:      'tr',
  
  edit:			function(event) {
					event.preventDefault();
					this.set('isEditing', true);
				}
});