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
	sync_date = SyncHistory.where(:app_key => session[:app_key], :resource_name => 'divers').maximum('created_at');
	#@divers = Diver.where(:dive_club_id => current_administrator.dive_club_id).all
	new_divers = Diver.find(:all, :conditions => [" dive_club_id = ? AND (created_at > ?)", current_administrator.dive_club_id, sync_date])
	updated_divers = Diver.find(:all, :conditions => [" dive_club_id = ? AND (updated_at > ?) AND (created_at <> updated_at)", current_administrator.dive_club_id, sync_date])
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
