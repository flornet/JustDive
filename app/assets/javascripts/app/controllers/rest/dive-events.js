#= require ../rest.js
#= require ../../lib/resource/controller/synced.js

JustDive.Controllers.Rest.DiveEvents = JustDive.Resource.Controller.Synced.extend({
  resourceType: JustDive.Models.DiveEvent,
  
  init: 			function() {
						this._super();
						this.sortContent();
					},
  
  sortContent:		function() {
						var content = this.get("content"), sortedContent;

						sortedContent = content.sort( function(a,b){
							var aStart = new Date(),
								bStart = new Date();
							aStart.fromISOFormat(a.get('start_date'));
							bStart.fromISOFormat(b.get('start_date'));
							return aStart - bStart;
						});

						this.set("content",sortedContent);
					}
});