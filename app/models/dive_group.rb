class DiveGroup < Synced
  attr_accessible :boat_departure_id, :estimated_dive_depth, :estimated_dive_time, :immersion_end_time, :immersion_start_time, :realized_dive_depth, :realized_dive_time, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :boat_departure
  has_many :dive_group_participants, :dependent => :destroy
  
  validates :boat_departure_id, :presence => true
  
  def self.findCreatedDiff(app_key_id, sync_date)
	if not sync_date.nil?
		conditions = [" (dive_groups.created_by_app_key_id IS NULL OR dive_groups.created_by_app_key_id  <> ?)
						AND (dive_groups.created_at > ?)", 
					  app_key_id, 
					  sync_date]
	else
		conditions = [" (dive_groups.created_by_app_key_id IS NULL OR dive_groups.created_by_app_key_id  <> ?) ", app_key_id]
	end
	return self.find(:all, :conditions => conditions)
  end
  
  def self.findUpdatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (dive_groups.last_updated_by_app_key_id IS NULL OR dive_groups.last_updated_by_app_key_id <> ?)
									  AND (dive_groups.updated_at > ?) 
									  AND (dive_groups.created_at <> dive_groups.updated_at)", 
									  app_key_id,												  
									  sync_date
									])
  end
  
end
