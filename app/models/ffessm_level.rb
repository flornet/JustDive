class FfessmLevel < Synced
  attr_accessible :name
  
  has_many :divers, :dependent => :restrict
  
  validates :name, :presence => true
  
  def self.findCreatedDiff(sync_date)
	if not sync_date.nil?
		conditions = ["created_at > ?", sync_date]
	else
		conditions = [""]
	end
	return self.find(:all, :conditions => conditions)
  end
	
  def self.findUpdatedDiff(sync_date)
	return self.find(
					:all, 
					:conditions => [
									" (updated_at > ?) 
									  AND (created_at <> updated_at)", 
									  sync_date
									])
  end
end
