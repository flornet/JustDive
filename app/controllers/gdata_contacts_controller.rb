class GdataContactsController < ApplicationController
  before_filter :administrator_required, :gdata_client_required
  
  def sync_divers
    @divers = {'updated' => 0, 'created' => 0, 'skipped' => []}
    dive_club_id = current_administrator.dive_club.id
    gdata_client = session[:gdata_client]
		divers_gdata = []
		
		# Retrives the data from Google Contacts
		feed = gdata_client.get('https://www.google.com/m8/feeds/contacts/default/full').to_xml
		feed.elements.each('entry') do |entry|
		  updated = false
		  
		  # Extracts interesting values
		  google_contact_id               = entry.elements['id'].text
		  email                           = entry.elements['gd:email]'].attribute('address').value
		  ffessm_level_id                 = 1
		  ffessm_licence_number           = ''
		  medical_certificate_expires_on  = ''
		  firstname                       = ''
		  lastname                        = ''
		  firstname                       = entry.elements['gd:name'].elements['gd:givenName'].text unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:givenName'].nil?
      lastname                        = entry.elements['gd:name'].elements['gd:familyName'].text unless entry.elements['gd:name'].nil? or entry.elements['gd:name'].elements['gd:familyName'].nil?
		  
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
		  diver.ffessm_level_id                 = ffessm_level_id
		  diver.ffessm_licence_number           = ffessm_licence_number
		  diver.medical_certificate_expires_on  = medical_certificate_expires_on
		  diver.firstname                       = firstname
		  diver.lastname                        = lastname
		  if diver.save
        if updated
          @divers['updated'] += 1
        else
          @divers['created'] += 1
        end
      else
        @divers['skipped'] << diver
      end
    end
    
    respond_to do |format|
      format.html { redirect_to :controller => 'divers', :notice => 'Divers were successfully synchronized.' }
      format.json { render :json => @divers, :status => :created, :location => @diver }
    end
  end
end
