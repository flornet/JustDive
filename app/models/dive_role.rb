class DiveRole < Synced
  attr_accessible :dive_club_id, :name, :created_by_app_key_id, :last_updated_by_app_key_id, :deleted_by_app_key_id
  
  belongs_to :dive_club
  has_many :dive_group_participants, :dependent => :restrict
  
  validates :name, :dive_club_id, :presence => true
end
