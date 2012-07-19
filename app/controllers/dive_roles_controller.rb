class DiveRolesController < SyncedController
  def resource
	return current_dive_club.dive_roles
  end
  
  def resourceName
	return 'dive_role'
  end
  
  # GET /dive_roles/diff.json
  def diff
	app_key_id 			= session[:app_key_id]
	sync_date 			= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'dive_roles').maximum('created_at');
	new_dive_roles		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_dive_roles	= resource.findUpdatedDiff(app_key_id, sync_date)
	deleted_dive_roles	= resource.findDeletedDiff(app_key_id, sync_date)
	@response = {:created => new_dive_roles, :updated => updated_dive_roles, :deleted => deleted_dive_roles}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
