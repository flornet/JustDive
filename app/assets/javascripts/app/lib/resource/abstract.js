#= require ../resource.js

JustDive.Resource.Abstract = Ember.Resource.extend({
	formatForTypeahead: 	function() {
								return {
									id: 		this.get('id'),
									fullname: 	this.get('id')
								}
							}
});