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
	
	levelBadge:			Ember.computed(function() {
							return '<span class="badge">LV ID: ' + this.get('ffessm_level_id') + '</span>';
						}).property('ffessm_level_id'),
						
	level:				Ember.computed(function() {
							return '(ID) ' + this.get('ffessm_level_id');
						}).property('ffessm_level_id'),
						
	formatForTypeahead: function() {
							return {
								id: 		this.get('id'),
								fullname: 	this.get('fullname') + ' (' + this.get('email') + ')',
								level:		this.get('levelBadge')
							}
						}
});
