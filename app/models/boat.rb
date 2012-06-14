class Boat < Synced 
  attr_accessible :dive_club_id, :name, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :dive_club
  has_many :boat_departures, :dependent => :restrict
  
  validates :name, :dive_club_id, :presence => true
end