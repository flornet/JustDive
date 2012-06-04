class SyncHistory < ActiveRecord::Base
  attr_accessible :app_key_id, :last_synced_on, :resource_name
end
