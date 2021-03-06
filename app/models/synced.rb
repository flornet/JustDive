class Synced < ActiveRecord::Base
  acts_as_paranoid
  
  self.abstract_class = true

  def self.findCreatedDiff(app_key_id, sync_date)
	if not sync_date.nil?
		conditions = [" (created_by_app_key_id IS NULL OR created_by_app_key_id  <> ?)
					AND (created_at > ?)",
					app_key_id, 
					sync_date]
	else
		conditions = [" (created_by_app_key_id IS NULL OR created_by_app_key_id  <> ?)", app_key_id]
	end
	return self.find(:all, :conditions => conditions)
  end
	
  def self.findUpdatedDiff(app_key_id, sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (last_updated_by_app_key_id IS NULL OR last_updated_by_app_key_id <> ?)
									  AND (updated_at > ?) 
									  AND (created_at <> updated_at)", 
									  app_key_id,												  
									  sync_date
									])
  end
  
  def self.findDeletedDiff(app_key_id, sync_date)
	return self.unscoped.find(
					:all, 
					:conditions => [
									" (deleted_by_app_key_id IS NULL OR deleted_by_app_key_id <> ?)
									  AND (deleted_at > ?)", 
									  app_key_id,												  
									  sync_date
									]).map {|i| i.id }

  end
end