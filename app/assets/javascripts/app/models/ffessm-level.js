#= require ../models.js
#= require ../lib/resource/synced.js

JustDive.Models.FfessmLevel = JustDive.Resource.Synced.extend({
	resourceUrl: 			'/ffessm_levels',
	resourceName:       	'ffessm_level',
	resourceProperties: [
							'id', 
							'name',
							'created_at',
							'updated_at'
						],
						
	badge:				Ember.computed(function() {
							return '<span class="label">' + this.get('name') + '</span>';
						}).property(),
});