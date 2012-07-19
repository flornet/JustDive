class BoatDeparture < Synced
  attr_accessible :boat_id, :departure_date, :dive_event_id, :created_by_app_key_id, :last_updated_by_app_key_id, :deleted_by_app_key_id
  
  belongs_to :boat
  belongs_to :dive_event
  has_one :dive_club, :through => :dive_event
  has_many :dive_groups, :dependent => :destroy
  
  validates :boat_id, :departure_date, :dive_event_id, :presence => true
  
  def self.findCreatedDiff(app_key_id, sync_date)
	if not sync_date.nil?
		conditions = [" (boat_departures.created_by_app_key_id IS NULL OR boat_departures.created_by_app_key_id  <> ?)
					  AND (boat_departures.created_at > ?)", 
					  app_key_id, 
					  sync_date]
	else
		conditions = [" (boat_departures.created_by_app_key_id IS NULL OR boat_departures.created_by_app_key_id  <> ?) ", app_key_id]
	end
	return self.find(:all, :conditions => conditions)
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
  
  def self.findDeletedDiff(app_key_id, sync_date)
	return self.unscoped.find(
					:all, 
					:conditions => [
									" (boat_departures.deleted_by_app_key_id IS NULL OR boat_departures.deleted_by_app_key_id <> ?)
									  AND (boat_departures.deleted_at > ?)", 
									  app_key_id,												  
									  sync_date
									]).map {|i| i.id }
  end
end
