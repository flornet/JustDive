class DiveGroupParticipantsController < SyncedController
  def resource
    return current_dive_club.dive_group_participants
  end
  
  def resourceName
	return 'dive_group_participant'
  end
  
  # POST /[model].json
  def create
    @model = DiveGroupParticipant.new(params[resourceName])
	if @model.created_by_app_key_id.nil?
		@model.created_by_app_key_id = session[:app_key_id]
	end

    respond_to do |format|
      if @model.save
        format.json { render :json => @model, :status => :created, :location => @model }
      else
        format.json { render :json => @model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /[model]/1.json
  def update
    @model = DiveGroupParticipant.find(params[:id])
	@model.last_updated_by_app_key_id = session[:app_key_id]
	
    respond_to do |format|
      if @model.update_attributes(params[resourceName])
        format.json { render :json => @model, :status => :ok, :location => @model }
      else
        format.json { render :json => @model.errors, :status => :unprocessable_entity }
      end
    end
  end
end
