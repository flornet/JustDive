#= require ../dive-groups.js

JustDive.Views.DiveGroups.List = JustDive.View.extend({
  templateName:    			'app/templates/dive-groups/list',
  classNames:   			['dive-groups-list'],
  didInsertElement: 		function() {
								this._super();
								this.$().find('.droppable').droppable({
																		hoverClass: 	'droppable-over',
																		activeClass:	'droppable-highlight',
																		accept:			'.participant',
																		drop: 			function(event, ui) {
																							var diverId = ui.draggable.attr('data-diver-id'),
																								diveGroupId = $(this).attr('data-dive-group-id');
																							JustDive.Controllers.Routed.DiveGroupParticipant.create(diverId, diveGroupId);
																						},
																		scope:			'participants'
																    });
							}
});