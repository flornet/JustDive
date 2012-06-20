#= require ../dive-group-participants.js

JustDive.Views.DiveGroupParticipants.List = JustDive.View.extend({
  templateName:    			'app/templates/dive-group-participants/list',
  classNames:   			['dive-group-participants-list'],
  unfilteredBinding:		"JustDive.restControllers.dive_group_participants",
  diveGroupParticipants: 	function() {
								return this.get("unfiltered").filterProperty('dive_group_id', parseInt(this.get('diveGroup').id))
							}.property('unfiltered.@each').cacheable() 
  
});