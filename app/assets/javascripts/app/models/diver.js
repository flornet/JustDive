JustDive.models.diver = JustDive.Resource.extend({
	resourceUrl: 		'/divers',
	resourceName:       'diver',
	resourceProperties: ['id', 'firstname', 'lastname', 'email', 'dive_club_id', 'ffessm_level_id'],
	
  	fullname: Ember.computed(function() {
		return this.get('firstname') + ' ' + this.get('lastname');
	}).property('firstname', 'lastname')
  /*
  id: null,
  dive_club_id: null,
  email: null, 
  ffessm_level_id: null, 
  ffessm_licence_number: null, 
  firstname: null, 
  lastname: null, 
  google_contact_id: null, 
  medical_certificate_expires_on: null,
  storage_id: 'divers',
  
  diverChanged: function () {
    //JustDive.getStorage(this.storage_id).proxy.update(this);
  }.observes('firstname', 'lastname')*/
});
