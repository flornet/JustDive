JustDive.models.diver = JustDive.SyncedResource.extend({
	resourceLocalAdapter: 	JustDive.resourceAdapters.local,
	resourceRemoteAdapter: 	JustDive.resourceAdapters.remote,
	resourceUrl: 			'/divers',
	resourceName:       	'diver',
	resourceProperties: [
							'id', 
							'firstname', 
							'lastname', 
							'email', 
							'dive_club_id', 
							'ffessm_level_id',
							'ffessm_licence_number',
							'google_contact_id',
							'medical_certificate_expires_on',
							'created_at',
							'updated_at'
						],
	
  	fullname: Ember.computed(function() {
		return this.get('firstname') + ' ' + this.get('lastname');
	}).property('firstname', 'lastname')
  /*
  diverChanged: function () {
    //JustDive.getStorage(this.storage_id).proxy.update(this);
  }.observes('firstname', 'lastname')*/
});
