#= require ../divers.js

JustDive.Views.Divers.ListShow = JustDive.View.extend({
  templateName: 'app/templates/divers/list-show',
  tagName:      'li',
  cssClass:		Ember.computed(function() {
					return 'diver-' + this.get('diver').id;
				}).property('diver').cacheable(),
});