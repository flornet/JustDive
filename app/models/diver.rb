class Diver < ActiveRecord::Base
  attr_accessible :dive_club_id, :email, :ffessm_level_id, :ffessm_licence_number, :firstname, :google_contact_id, :lastname, :medical_certificate_expires_on

  belongs_to :dive_club
end
