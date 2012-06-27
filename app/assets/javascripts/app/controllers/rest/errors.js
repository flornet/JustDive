#= require ../rest.js
#= require ../../lib/resource/controller/local.js

JustDive.Controllers.Rest.Errors = JustDive.Resource.Controller.Local.extend({
	resourceType: JustDive.Models.Error,
	
	init: function() {
		this._super();
		this.deleteAllLocal();
		this.findAll();
	}
});