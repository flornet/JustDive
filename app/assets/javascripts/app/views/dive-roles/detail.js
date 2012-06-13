#= require ../dive-roles.js

JustDive.Views.DiveRoles.Detail = JustDive.CrudFormView.extend({
  templateName: 'app/templates/dive-roles/detail',
  classNames:   ['dive-role-details'],
  
  getCrudController: function() {
	return JustDive.Controllers.DiveRole;
  }
});