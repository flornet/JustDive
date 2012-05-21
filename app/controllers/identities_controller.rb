class IdentitiesController < ApplicationController

  # GET /identities/new
  # GET /identities/new.json
  def new
    @identity = Identity.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => [:identity => @identity, :authenticity_token => form_authenticity_token()] }
    end
  end

  # POST /identities
  # POST /identities.json
  def create
    @identity = Identity.new(params[:identity])

    respond_to do |format|
      if @identity.save
        session[:administrator_id] = @identity.administrator_id
    		session[:gdata_client] = @identity.gdata_client
        format.html { redirect_to :root, :notice => 'Identity was successfully created.' }
        format.json { render :json => @identity, :status => :created, :location => @identity }
      else
        format.html { render :action => "new" }
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
