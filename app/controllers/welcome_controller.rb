class WelcomeController < ApplicationController
  layout :resolve_layout
  
  # GET /welcome
  # GET /welcome.json
  def index
    @message = 'Welcome'

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @message }
    end
  end
  
  def admin
	@message = 'Welcome'
	respond_to do |format|
		format.html # index.html.erb
		format.json { render :json => @message }
	end
  end
  
  private
  
  def resolve_layout
    case action_name
    when "index"
      "main"
    when "admin"
      "admin"
    else
      "main"
    end
  end

end