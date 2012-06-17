#= require ../boats.js

JustDive.Views.Boats.List = JustDive.View.extend({
  templateName:   	'app/templates/boats/list',
  classNames:   	['boats-list'],
  boatsBinding: 	'JustDive.restControllers.boats'
});