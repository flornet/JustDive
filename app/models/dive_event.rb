class DiveEvent < Synced
  attr_accessible :dive_club_id, :end_date, :start_date, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :dive_club
  has_many :boat_departures, :dependent => :destroy
  has_many :dive_event_participants, :dependent => :destroy
  
  validates :dive_club_id, :end_date, :start_date, :presence => true
end
