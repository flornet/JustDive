class IdentityController < ApplicationController

  # GET /identity/get_token.json
  def get_token
    @response = {:authenticity_token => form_authenticity_token()}
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
  
  # GET /identity/show.json
  def show
    @response = {:current_administrator => current_administrator}
    respond_to do |format|
      format.json { render :json => @response }
    end
  end

  # POST /identity.json
  def create
    @identity = Identity.new(params[:identity])

    respond_to do |format|
      if @identity.save
        session[:administrator_id] = @identity.administrator_id
		session[:app_key] = @identity.app_key
        session[:gdata_client] = @identity.gdata_client
        format.json { render :json => @identity, :status => :created }
      else
        format.json { render :json => @identity.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /identity
  # DELETE /identity.json
  def destroy
    reset_session

    respond_to do |format|
      format.json { head :no_content }
	    #format.json { render json: => nil, :status => :ok }
    end
  end
end
