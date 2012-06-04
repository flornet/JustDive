class AppKey < ActiveRecord::Base
  attr_accessible :administrator_id, :code
  
  belongs_to :administrator
  has_many :sync_histories, :dependent => :restrict
  
end
