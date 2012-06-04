class Diver < ActiveRecord::Base
  attr_accessible :dive_club_id, :created_by_app_key_id, :last_updated_by_app_key_id, :email, :ffessm_level_id, :ffessm_licence_number, :firstname, :google_contact_id, :lastname, :medical_certificate_expires_on

  validates :email, :dive_club_id, :ffessm_level_id, :firstname, :lastname, :presence => true
  #validates :email, :uniqueness => { :case_sensitive => false }
  
  belongs_to :dive_club
  
	def self.findCreatedDiff(dive_club_id, app_key_id, sync_date)
		return self.find(
						:all, 
						:conditions => [
										" dive_club_id = ? 
										  AND created_by_app_key_id  <> ?
										  AND (created_at > ?)", 
										  dive_club_id, 
										  app_key_id, 
										  sync_date
										])
	end
	
	def self.findUpdatedDiff(dive_club_id, app_key_id, sync_date)
		return self.find(
						:all, 
						:conditions => [
										" dive_club_id = ? 
										  AND last_updated_by_app_key_id <> ?
										  AND (updated_at > ?) 
										  AND (created_at <> updated_at)", 
										  dive_club_id,
										  app_key_id,												  
										  sync_date
										])
	end
end
