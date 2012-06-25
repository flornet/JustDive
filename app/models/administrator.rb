class Administrator < ActiveRecord::Base
  attr_accessible :dive_club_id, :email, :firstname, :lastname
  
  belongs_to :dive_club
  has_many :app_keys, :dependent => :restrict
  
  def fullname
    return self.firstname + ' ' + self.lastname + ' (' + self.email + ')'
  end
  
  def sync_divers(gdata_client)
    divers = {'updated' => 0, 'created' => 0, 'skipped' => []}
    dive_club_id = self.dive_club.id
	divers_gdata = []
		
	# Retrives the data from Google Contacts
	feed = gdata_client.get('https://www.google.com/m8/feeds/contacts/default/full').to_xml
	feed.elements.each('entry') do |entry|
		updated = false

		# Extracts interesting values
		google_contact_id	= entry.elements['id'].text
		email          		= entry.elements['gd:email]'].attribute('address').value
		firstname        	= ''
		lastname         	= ''
		firstname        	= entry.elements['gd:name'].elements['gd:givenName'].text unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:givenName'].nil?
		lastname         	= entry.elements['gd:name'].elements['gd:familyName'].text unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:familyName'].nil?
		  
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
    return divers
  end
end
