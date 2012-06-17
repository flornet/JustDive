class DiveGroup < ActiveRecord::Base
  attr_accessible :boat_departure_id, :estimated_dive_depth, :estimated_dive_time, :immersion_end_time, :immersion_start_time, :realized_dive_depth, :realized_dive_time, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :boad_departure
  has_many :dive_group_participants, :dependent => :restrict
  
  validates :boat_departure_id, :presence => true
end
