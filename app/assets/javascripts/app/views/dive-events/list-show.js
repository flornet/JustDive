#= require ../dive-events.js

JustDive.Views.DiveEvents.ListShow = JustDive.View.extend({
  templateName: 'app/templates/dive-events/list-show',
  tagName:      'li',
  cssClass:		Ember.computed(function() {
					return 'event-' + this.get('diveEvent').id;
				}).property('diveEvent').cacheable(),
});