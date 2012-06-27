class BoatDeparture < Synced
  attr_accessible :boat_id, :departure_date, :dive_event_id, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :boat
  belongs_to :dive_event
  has_one :dive_club, :through => :dive_event
  has_many :dive_groups, :dependent => :destroy
  
  validates :boat_id, :departure_date, :dive_event_id, :presence => true
  
  def self.findCreatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (boat_departures.created_by_app_key_id IS NULL OR boat_departures.created_by_app_key_id  <> ?)
									  AND (boat_departures.created_at > ?)", 
									  app_key_id, 
									  sync_date
									])
  end
  
  def self.findUpdatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (boat_departures.last_updated_by_app_key_id IS NULL OR boat_departures.last_updated_by_app_key_id <> ?)
									  AND (boat_departures.updated_at > ?) 
									  AND (boat_departures.created_at <> boat_departures.updated_at)", 
									  app_key_id,												  
									  sync_date
									])
  end
end
