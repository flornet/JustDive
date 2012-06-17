class Synced < ActiveRecord::Base
  self.abstract_class = true

  def self.findCreatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" created_by_app_key_id  <> ?
									  AND (created_at > ?)", 
									  app_key_id, 
									  sync_date
									])
  end
	
  def self.findUpdatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" last_updated_by_app_key_id <> ?
									  AND (updated_at > ?) 
									  AND (created_at <> updated_at)", 
									  app_key_id,												  
									  sync_date
									])
  end
end