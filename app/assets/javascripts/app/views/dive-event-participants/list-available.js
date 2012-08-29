#= require ../dive-event-participants.js

JustDive.Views.DiveEventParticipants.ListAvailable = JustDive.View.extend({
  templateName:    			'app/templates/dive-event-participants/list-available',
  classNames:   			['dive-event-participants-list'],
  didInsertElement: 		function() {
								this._super();
								this.$().find('.draggable').draggable({
																		helper: 	'clone', 
																		appendTo: 	'body',
																		addClasses: false,
																		revert: 	'invalid',
																		scope: 		'participants',
																		cursor:		'move'
																	});
							}
});