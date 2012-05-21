JustDive.ListDiversView = JustDive.View.extend({
  templateName:    'app/templates/divers/list',
  diversBinding: 'JustDive.addressBookController',

  refreshListing: function() {
    JustDive.addressBookController.findAll();
  }
});