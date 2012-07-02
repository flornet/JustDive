class SyncHistory < ActiveRecord::Base
  attr_accessible :app_key_id, :resource_name
  
  validates :app_key_id, :resource_name, :presence => true
  
  belongs_to :app_key
end
