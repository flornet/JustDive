class Administrator < ActiveRecord::Base
  attr_accessible :dive_club_id, :email, :firstname, :lastname
  
  belongs_to :dive_club
  
  def fullname
    return self.firstname + ' ' + self.lastname + ' (' + self.email + ')'
  end
end
