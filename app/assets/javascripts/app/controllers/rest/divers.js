#= require ../rest.js
#= require ../../lib/resource/controller/synced.js

JustDive.Controllers.Rest.Divers = JustDive.Resource.Controller.Synced.extend({
  resourceType: 	JustDive.Models.Diver,
  
  init: 			function() {
						this._super();
						//this.sortContent();
					},
  
  sortContent:		function() {
						var content = this.get("content"), sortedContent;

						sortedContent = content.sort( function(a,b) {
							var nameA = a.get('lastname').toLowerCase(), 
								nameB = b.get('lastname').toLowerCase();
							if (nameA < nameB) //sort string ascending
								return -1;
							if (nameA > nameB)
								return 1;
							return 0;
						});

						this.set("content",sortedContent);
					},
	
	sorted: 		Ember.computed(function() {
						return this.get("content").sort( function(a,b) {
							var nameA = a.get('lastname').toLowerCase(), 
								nameB = b.get('lastname').toLowerCase();
							if (nameA < nameB) //sort string ascending
								return -1;
							if (nameA > nameB)
								return 1;
							return 0;
						});
					}).property('content.@each').cacheable()
});