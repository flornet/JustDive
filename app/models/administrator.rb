class Administrator < ActiveRecord::Base
  attr_accessible :dive_club_id, :email, :firstname, :lastname
  
  belongs_to :dive_club
  has_many :app_keys, :dependent => :destroy
  
  def fullname
    return self.firstname + ' ' + self.lastname + ' (' + self.email + ')'
  end
  
  def sync_divers(gdata_client, updatedMin = nil)
    divers = {'updated' => 0, 'created' => 0, 'skipped' => []}
    dive_club_id = self.dive_club.id
	divers_gdata = []
		
	# Retrives the data from Google Contacts
	if updatedMin.is_a?(Time)
		feed = gdata_client.get('https://www.google.com/m8/feeds/contacts/default/full?updated-min=' +  updatedMin.strftime('%Y-%m-%dT%d:%M:%S')).to_xml   #2007-03-16T00:00:00
	else
		feed = gdata_client.get('https://www.google.com/m8/feeds/contacts/default/full?max-results=5000').to_xml
	end
	feed.elements.each('entry') do |entry|
		# Validation of Google Contact Datas
		if  !entry.elements['id'].nil? and !entry.elements['gd:email]'].nil?
			updated = false

			# Extracts interesting values
			google_contact_id	= entry.elements['id'].text
			email          		= entry.elements['gd:email]'].attribute('address').value
			firstname        	= ''
			lastname         	= ''
			firstname        	= entry.elements['gd:name'].elements['gd:givenName'].text.titlecase unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:givenName'].nil?
			lastname         	= entry.elements['gd:name'].elements['gd:familyName'].text.titlecase unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:familyName'].nil?
			
			if firstname == ''
				tmp = email.split("@")
				tmp2  = tmp.first.split(".")
				firstname = tmp2.first.titlecase
				lastname = tmp2.last.titlecase
			end
			if lastname == ''
				lastname = '(indéfini)'
			end
			# Tries to find an existing Diver
			diver = Diver.find_by_dive_club_id_and_email(dive_club_id, email)
			if diver.nil?
				# Builds a new Diver
				diver = Diver.new do |d|
					d.dive_club_id = dive_club_id
					d.email = email
				end
			else
				updated = true
			end

			# Updates the data
			diver.google_contact_id               = google_contact_id
			diver.firstname                       = firstname
			diver.lastname                        = lastname
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
