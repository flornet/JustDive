JustDive.Diver = JustDive.Object.extend({
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
    JustDive.getStorage(this.storage_id).proxy.update(this);
  }.observes('firstname', 'lastname')
});
