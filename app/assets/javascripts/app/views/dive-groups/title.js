#= require ../dive-groups.js

JustDive.Views.DiveGroups.Title = JustDive.View.extend({
  templateName: 'app/templates/dive-groups/title',
  classNames:   ['title'],
  tagName:		'div',
  title: 		function() {
					return 'Palanquée n°' + (this.get('_parentView.contentIndex') + 1);
			    }.property()
});