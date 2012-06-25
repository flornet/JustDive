#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.DiveGroupParticipant = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/dive_group_participants',
	resourceName:       	'dive_group_participant',
	resourceProperties: [
							'id', 
							'dive_group_id',
							'dive_role_id',
							'diver_id',
							'created_at',
							'updated_at'
						],
						
	title: 				Ember.computed(function() {
							return this.get('id');
						}).property('id'),
	
	diver: 				Ember.computed(function() {
							var diverId = this.get('diver_id') || undefined;
							if (diverId === undefined) {
								return false;
							} else {
								return JustDive.restControllers.divers.findObject(diverId);
							}
						}).property('diver_id').cacheable(),
	
	diveRole: 			Ember.computed(function() {
							var diveRoleId = this.get('dive_role_id') || undefined;
							if (diveRoleId === undefined) {
								return false;
							} else {
								return JustDive.restControllers.dive_roles.findObject(diveRoleId);
							}
						}).property('dive_role_id').cacheable(),
	
	diveGroup: 			Ember.computed(function() {
							var diveGroupId = this.get('dive_group_id') || undefined;
							if (diveGroupId === undefined) {
								return false;
							} else {
								return JustDive.restControllers.dive_groups.findObject(diveGroupId);
							}
						}).property('dive_group_id').cacheable(),
});
