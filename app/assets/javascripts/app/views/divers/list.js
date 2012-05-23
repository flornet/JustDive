JustDive.views.divers.list = JustDive.View.extend({
  templateName:    	'app/templates/divers/list',
  diversBinding: 	'JustDive.controllers.divers',  // == JustDive.controllers.divers.content
  
  refreshListing: function() {
    JustDive.controllers.divers.findAll();
  }
});