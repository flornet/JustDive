#= require ../divers.js

JustDive.Views.Divers.List = JustDive.View.extend({
  templateName:    	'app/templates/divers/list',
  classNames:   	['divers-list'],
  diversBinding: 	'JustDive.Controllers.Rest.Divers'  // == JustDive.controllers.divers.content
  /*
  refreshListing: function() {
    JustDive.controllers.divers.findAll();
  }*/
});