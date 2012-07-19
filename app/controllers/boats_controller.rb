class BoatsController < SyncedController
  def resource
	return current_dive_club.boats
  end
  
  def resourceName
	return 'boat'
  end
  
  # GET /dive_roles/diff.json
  def diff
	app_key_id 		= session[:app_key_id]
	sync_date 		= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'boats').maximum('created_at');
	new_boats		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_boats	= resource.findUpdatedDiff(app_key_id, sync_date)
	deleted_boats 	= resource.findDeletedDiff(app_key_id, sync_date)
	@response = {:created => new_boats, :updated => updated_boats, :deleted => deleted_boats}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
