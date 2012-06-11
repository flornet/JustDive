class DiveEvent < ActiveRecord::Base
  attr_accessible :dive_club_id, :end_date, :start_date, :created_by_app_key_id, :last_updated_by_app_key_id
  
  belongs_to :dive_club
  has_many :boad_departures, :dependent => :restrict
  
  validates :dive_club_id, :end_date, :start_date, :presence => true
end
