#= require ../dive-roles.js

JustDive.Views.DiveRoles.Detail = JustDive.View.extend({
  templateName: 'app/templates/dive-roles/detail',
  classNames:   ['dive-role-details'],
  tagName:    	'form',
  error: 		'',
  
  destroy: function(event) {
	if (event) event.preventDefault();
	this.set('isAppened', false);
	this.remove();
  },
  
  edit: function(event) {
	if (event) event.preventDefault();
	this.set('isCreating', false);
	this.set('isEditing', true);
  },
  
  submit: function(event) {
    event.preventDefault();
	if (this.get('isCreating')) {
		JustDive.Controllers.ClubAdmin.diveRolesCreate(this.diveRole);
	} else {
		JustDive.Controllers.ClubAdmin.diveRolesUpdate(this.diveRole);
	}
  }
});