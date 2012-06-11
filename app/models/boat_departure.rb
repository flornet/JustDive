class BoatDeparture < ActiveRecord::Base
  attr_accessible :boat_id, :departure_date, :dive_event_id, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :boat
  belongs_to :dive_event
  has_many :dive_groups, :dependent => :restrict
  
  validates :boat_id, :departure_date, :dive_event_id, :presence => true
end
