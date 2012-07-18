#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.Diver = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/divers',
	resourceName:       	'diver',
	resourceProperties: [
							'id', 
							'firstname', 
							'lastname', 
							'email', 
							'dive_club_id', 
							'ffessm_level_id',
							'ffessm_licence_number',
							'google_contact_id',
							'medical_certificate_expires_on',
							'created_at',
							'updated_at'
						],
	
  	fullname: 			Ember.computed(function() {
							return this.get('firstname') + ' ' + this.get('lastname');
						}).property('firstname', 'lastname'),
						
	level:				Ember.computed(function() {
							var ffessmLevelId = this.get('ffessm_level_id') || undefined;
							if (ffessmLevelId !== undefined) {
								return JustDive.restControllers.ffessm_levels.findObject(ffessmLevelId);
							}
							if (this.get('ffessmLevelLive') !== null) {
								return JustDive.restControllers.ffessm_levels.findObject(this.get('ffessmLevelLive').id);
							}
							return false;
						}).property('ffessm_level_id').cacheable(),
						
	formatForTypeahead: function() {
							return {
								id: 		this.get('id'),
								fullname: 	this.get('fullname') + ' (' + this.get('email') + ')',
								level:		this.get('level').get('badge')
							}
						}
});
