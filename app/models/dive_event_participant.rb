class DiveEventParticipant < Synced
  attr_accessible :comment, :created_by_app_key_id, :dive_event_id, :diver_id, :last_updated_by_app_key_id
  
  belongs_to :dive_event
  belongs_to :diver
  has_one :dive_club, :through => :dive_event
  
  validates :diver_id, :dive_event_id, :presence => true
  
  def self.findCreatedDiff(app_key_id, sync_date)
	if not sync_date.nil?
		conditions = [" (dive_event_participants.created_by_app_key_id IS NULL OR dive_event_participants.created_by_app_key_id  <> ?)
					  AND (dive_event_participants.created_at > ?)", 
					  app_key_id, 
					  sync_date]
	else
		conditions = [" (dive_event_participants.created_by_app_key_id IS NULL OR dive_event_participants.created_by_app_key_id  <> ?) ", app_key_id]
	end
	return self.find(:all, :conditions => conditions)
  end
  
  def self.findUpdatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (dive_event_participants.last_updated_by_app_key_id IS NULL OR dive_event_participants.last_updated_by_app_key_id <> ?)
									  AND (dive_event_participants.updated_at > ?) 
									  AND (dive_event_participants.created_at <> dive_event_participants.updated_at)", 
									  app_key_id,												  
									  sync_date
									])
  end
end
