class FfessmLevel < ActiveRecord::Base
  attr_accessible :name
  
  has_many :divers, :dependent => :restrict
end
