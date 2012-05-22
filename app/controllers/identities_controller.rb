class IdentitiesController < ApplicationController

  # GET /identities/get_token.json
  def get_token
    @response = {:authenticity_token => form_authenticity_token()}
    respond_to do |format|
      format.json { render :json => @response }
    end
  end

  # POST /identities.json
  def create
    @identity = Identity.new(params[:identity])

    respond_to do |format|
      if @identity.save
        session[:administrator_id] = @identity.administrator_id
        session[:gdata_client] = @identity.gdata_client
        format.json { render :json => @identity, :status => :created }
      else
        format.json { render :json => @identity.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /identities/1
  # DELETE /identities/1.json
  def destroy
    reset_session

    respond_to do |format|
      format.html { redirect_to :root }
      format.json { head :no_content }
    end
  end
end
