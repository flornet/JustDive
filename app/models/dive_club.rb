class DiveClub < ActiveRecord::Base
  attr_accessible :ffessm_licence_number, :name
  
  has_many :administrators, :dependent => :restrict
  has_many :divers, :dependent => :restrict
  has_many :dive_roles, :dependent => :restrict
  has_many :boats, :dependent => :restrict
  has_many :dive_events, :dependent => :restrict
  
  validates :name, :presence => true
end
