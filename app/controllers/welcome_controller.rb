class WelcomeController < ApplicationController
  layout "main"
  
  # GET /welcome
  # GET /welcome.json
  def index
    @message = 'Welcome'

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @message }
    end
  end

end