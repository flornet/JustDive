class DiveGroupsController < SyncedController
  def resource
    return current_dive_club.dive_groups
  end
  
  def resourceName
	return 'dive_group'
  end
  
  # POST /[model].json
  def create
    @model = DiveGroup.new(params[resourceName])
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
    @model = DiveGroup.find(params[:id])
	@model.last_updated_by_app_key_id = session[:app_key_id]
	
    respond_to do |format|
      if @model.update_attributes(params[resourceName])
        format.json { render :json => @model, :status => :ok, :location => @model }
      else
        format.json { render :json => @model.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # GET /dive_groups/diff.json
  def diff
	app_key_id 				= session[:app_key_id]
	sync_date 				= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'dive_groups').maximum('created_at');
	new_dive_groups 		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_dive_groups		= resource.findUpdatedDiff(app_key_id, sync_date)
	deleted_dive_groups		= resource.findDeletedDiff(app_key_id, sync_date)
	@response = {:created => new_dive_groups, :updated => updated_dive_groups, :deleted => deleted_dive_groups}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
