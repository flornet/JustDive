#= require ../main.js

JustDive.Views.Main.Layout = JustDive.View.extend({
  templateName: 		'app/templates/main/layout',
  tagName:     			'div',
  classNames:			'app',
  attributeBindings: 	['role'],
  role:					'main'
});