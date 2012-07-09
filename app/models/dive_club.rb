class DiveClub < ActiveRecord::Base
  attr_accessible :ffessm_licence_number, :name
  
  has_many :administrators, :dependent => :restrict
  has_many :divers, :dependent => :restrict
  has_many :dive_roles, :dependent => :restrict
  has_many :boats, :dependent => :restrict
  has_many :dive_events, :dependent => :restrict
  has_many :boat_departures, :through => :dive_events, :dependent => :restrict
  has_many :dive_groups, :through => :boat_departures, :dependent => :restrict
  has_many :dive_group_participants, :through => :dive_groups, :dependent => :restrict
  has_many :dive_event_participants, :through => :dive_events, :dependent => :restrict
  
  has_many :app_keys, :through => :administrators, :dependent => :restrict
  has_many :sync_histories, :through => :app_keys, :dependent => :restrict
  
  validates :name, :presence => true
end
