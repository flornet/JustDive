#= require ../dive-groups.js

JustDive.Views.DiveGroups.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/dive-groups/detail',
  classNames:   ['dive-group-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.Routed.DiveGroup;
  }
});