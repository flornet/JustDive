class Identity
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming
  
  attr_accessor :administrator_id, :email, :password, :gdata_client
  
  #validates_presence_of :email, :password
  #validates_format_of :email, :with => /^[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}$/i
  
  def initialize(attributes = {})
    @errors = ActiveModel::Errors.new(self)
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end
  
  def persisted?
    false
  end

  def save(attributes = {})
    self.email = self.email.downcase
    administrator = Administrator.find_by_email(self.email)
    if administrator.nil?
      errors.add(:password, 'Authentication failed (Not allowed to use this app).')
      return false
    else
      begin
        client = GData::Client::Contacts.new
        client.clientlogin(self.email, self.password)
        client.version = 3
        self.gdata_client = client
        self.administrator_id = administrator.id
        return true
      rescue GData::Client::AuthorizationError
        errors.add(:password, 'Authentication failed (Rejected by Google).')
        return false
      end
    end
  end

end
