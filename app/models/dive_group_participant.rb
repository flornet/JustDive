class DiveGroupParticipant < Synced
  attr_accessible :dive_group_id, :dive_role_id, :diver_id, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :dive_group
  belongs_to :diver
  belongs_to :dive_role
  
  validates :dive_group_id, :dive_role_id, :diver_id, :presence => true
  
  def self.findCreatedDiff(app_key_id, sync_date)
	if not sync_date.nil?
		conditions = [" (dive_group_participants.created_by_app_key_id IS NULL OR dive_group_participants.created_by_app_key_id  <> ?)
						AND (dive_group_participants.created_at > ?)", 
					  app_key_id, 
					  sync_date]
	else
		conditions = [" (dive_group_participants.created_by_app_key_id IS NULL OR dive_group_participants.created_by_app_key_id  <> ?) ", app_key_id]
	end
	return self.find(:all, :conditions => conditions)
  end
  
  def self.findUpdatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (dive_group_participants.last_updated_by_app_key_id IS NULL OR dive_group_participants.last_updated_by_app_key_id <> ?)
									  AND (dive_group_participants.updated_at > ?) 
									  AND (dive_group_participants.created_at <> dive_group_participants.updated_at)", 
									  app_key_id,												  
									  sync_date
									])
  end
  
end
