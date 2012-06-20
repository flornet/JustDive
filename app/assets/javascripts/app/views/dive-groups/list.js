#= require ../dive-groups.js

JustDive.Views.DiveGroups.List = JustDive.View.extend({
  templateName:    			'app/templates/dive-groups/list',
  classNames:   			['dive-groups-list'],
  unfilteredBinding:		"JustDive.restControllers.dive_groups",
  diveGroups: 				function() {
								return this.get("unfiltered").filterProperty('boat_departure_id', parseInt(this.get('boatDeparture').id))
							}.property('unfiltered.@each').cacheable() 
  
});