class DiversController < ApplicationController
  before_filter :administrator_required

  # GET /divers.json
  def index
    @divers = Diver.where(:dive_club_id => current_administrator.dive_club_id).all
	
    respond_to do |format|
      format.json { render :json => @divers }
    end
  end
  
  # GET /divers/diff.json
  def diff
	app_key_id 		= session[:app_key_id]
	sync_date 		= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'divers').maximum('created_at');
	new_divers 		= Diver.findCreatedDiff(current_administrator.dive_club_id, app_key_id, sync_date)
	updated_divers 	= Diver.findUpdatedDiff(current_administrator.dive_club_id, app_key_id, sync_date)
	@response = {:created => new_divers, :updated => updated_divers}
	
    respond_to do |format|
	  #format.json { render :json => sync_date}
      format.json { render :json => @response }
    end
  end

  # GET /divers/1.json
  def show
    @diver = Diver.find(params[:id])

    respond_to do |format|
      format.json { render :json => @diver }
    end
  end

  # POST /divers.json
  def create
    @diver = Diver.new(params[:diver])
	if @diver.dive_club_id.nil?
		@diver.dive_club_id = current_administrator.dive_club_id
	end
	if @diver.created_by_app_key_id.nil?
		@diver.created_by_app_key_id = session[:app_key_id]
	end
	if @diver.ffessm_level_id.nil?
		@diver.ffessm_level_id = 1
	end

    respond_to do |format|
      if @diver.save
        format.json { render :json => @diver, :status => :created, :location => @diver }
      else
        format.json { render :json => @diver.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /divers/1.json
  def update
    @diver = Diver.find(params[:id])
	@diver.last_updated_by_app_key_id = session[:app_key_id]
	
    respond_to do |format|
      if @diver.update_attributes(params[:diver])
        format.json { render :json => @diver, :status => :ok, :location => @diver }
		    #format.json { render json: nil, status: :ok }
      else
        format.json { render :json => @diver.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /divers/1.json
  def destroy
    @diver = Diver.find(params[:id])
    @diver.destroy

    respond_to do |format|
      format.json { head :no_content }
	    #format.json { render json: nil, status: :ok }
    end
  end
end
