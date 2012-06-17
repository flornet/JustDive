#= require ../dive-roles.js

JustDive.Views.DiveRoles.List = JustDive.View.extend({
  templateName:    		'app/templates/dive-roles/list',
  classNames:   		['dive-roles-list'],
  diveRolesBinding: 	'JustDive.restControllers.dive_roles'
});