class Identity
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming
  
  attr_accessor :administrator_id, :email, :password, :gdata_client, :app_key, :app_key_id
  
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
	  app_key = AppKey.find_or_create_by_code(:code => self.app_key, :administrator_id => administrator.id)
	  if app_key.administrator_id != administrator.id
		  errors.add(:password, 'The app key is already used by another administrator.')
          return false
	  else
		  self.app_key = nil
		  self.app_key_id = app_key.id
		  begin
			client = GData::Client::Contacts.new
			client.clientlogin(self.email, self.password)
			client.version = 3
			self.password = nil
			self.gdata_client = client
			self.administrator_id = administrator.id
			return true
		  rescue GData::Client::AuthorizationError
			self.password = nil
			errors.add(:password, 'Authentication failed (Rejected by Google).')
			return false
		  end
	  end
    end
  end

end
