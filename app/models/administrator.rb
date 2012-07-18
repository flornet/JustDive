class Administrator < ActiveRecord::Base
  attr_accessible :dive_club_id, :email, :firstname, :lastname
  
  belongs_to :dive_club
  has_many :app_keys, :dependent => :destroy
  
  def fullname
    return self.firstname + ' ' + self.lastname + ' (' + self.email + ')'
  end
  
  def sync_divers(gdata_client, updatedMin = nil)
    customFieldLevel = 'Niveau'
    customFieldMedicalCertificate = 'Certificat'
    divers = {'updated' => 0, 'created' => 0, 'skipped' => []}
    dive_club_id = self.dive_club.id
	divers_gdata = []
	levels = Hash.new
	FfessmLevel.all.each {|lvl| levels[lvl.id] = lvl.name.downcase}
	
	# Retrives the data from Google Contacts
	if updatedMin.is_a?(Time)
		feed = gdata_client.get('https://www.google.com/m8/feeds/contacts/default/full?updated-min=' +  updatedMin.strftime('%Y-%m-%dT%d:%M:%S')).to_xml   #2007-03-16T00:00:00
	else
		feed = gdata_client.get('https://www.google.com/m8/feeds/contacts/default/full?max-results=5000').to_xml
	end

	feed.elements.each('entry') do |entry|
		# Validation of Google Contact Datas
		if  !entry.elements['id'].nil? #and !entry.elements['gd:email'].nil?
			updated = false
			# Extracts interesting values
			google_contact_id	= entry.elements['id'].text
			email          		= ''
			firstname        	= ''
			lastname         	= ''
			level_name      	= ''
			ffessm_level_id		= nil
			medical_certificate	= ''
			email          		= entry.elements['gd:email'].attribute('address').value unless entry.elements['gd:email'].nil?
			firstname        	= entry.elements['gd:name'].elements['gd:givenName'].text.titlecase unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:givenName'].nil?
			lastname         	= entry.elements['gd:name'].elements['gd:familyName'].text.titlecase unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:familyName'].nil?
			if !entry.elements['gContact:userDefinedField'].nil?
			  entry.elements.each('gContact:userDefinedField') do |customField|
				  level_name = customField.attribute('value').value.downcase if customField.attribute('key').value.downcase == customFieldLevel.downcase
				  medical_certificate = customField.attribute('value').value.downcase if customField.attribute('key').value.downcase == customFieldMedicalCertificate.downcase
				end
			end
			
			if firstname == '' && email != ''
				tmp = email.split("@")
				if !tmp.first.nil?
					tmp2  = tmp.first.split(".")
					firstname = tmp2.first.titlecase
					lastname = tmp2.last.titlecase
				end
			end
			
			if lastname == ''
				lastname = '(indéfini)'
			end
			
			if level_name != ''
				if levels.has_value?(level_name)
					ffessm_level_id = levels.key(level_name)
				end
			end
			# Tries to find an existing Diver
			diver = Diver.find_by_dive_club_id_and_google_contact_id(dive_club_id, google_contact_id)
			if diver.nil?
				# Builds a new Diver
				diver = Diver.new do |d|
					d.dive_club_id = dive_club_id
					d.google_contact_id = google_contact_id
				end
			else
				updated = true
			end

			# Updates the data
			diver.email           	= email
			diver.firstname      	= firstname
			diver.lastname       	= lastname
			diver.ffessm_level_id	= ffessm_level_id
			if diver.save
				if updated
					divers['updated'] += 1
				else
					divers['created'] += 1
				end
			else
				divers['skipped'] << diver
			end
		end
	end
    return divers
  end
end
