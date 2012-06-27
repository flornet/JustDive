#= require ../errors.js

JustDive.Views.Errors.Index = JustDive.View.extend({
  templateName: 		'app/templates/errors/index',
  classNames:   		['errors-list'],
  errorsBinding: 		'JustDive.restControllers.errors'
});