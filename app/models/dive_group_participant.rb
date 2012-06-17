class DiveGroupParticipant < ActiveRecord::Base
  attr_accessible :dive_group_id, :dive_role_id, :diver_id, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :dive_group
  belongs_to :diver
  belongs_to :dive_role
  
  validates :dive_group_id, :dive_role_id, :diver_id, :presence => true
end
