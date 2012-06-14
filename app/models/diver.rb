class Diver < Synced
  attr_accessible :dive_club_id, :created_by_app_key_id, :last_updated_by_app_key_id, :email, :ffessm_level_id, :ffessm_licence_number, :firstname, :google_contact_id, :lastname, :medical_certificate_expires_on

  belongs_to :dive_club
  belongs_to :ffessm_level
  has_many :dive_group_participants, :dependent => :restrict
  
  validates :email, :dive_club_id, :ffessm_level_id, :firstname, :lastname, :presence => true
  #validates :email, :uniqueness => { :case_sensitive => false }

  before_validation :set_default_ffessm_level
  
  private
    def set_default_ffessm_level
	  if self.ffessm_level_id.nil?
		self.ffessm_level_id = 1
	  end
    end
end
