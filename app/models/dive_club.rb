class DiveClub < ActiveRecord::Base
  attr_accessible :ffessm_licence_number, :name
  
  has_many :administrators, :dependent => :restrict
  has_many :divers, :dependent => :restrict
end
