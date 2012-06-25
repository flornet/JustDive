class DiversController < SyncedController
  def resource
	return current_dive_club.divers
  end
  
  def resourceName
	return 'diver'
  end

  # GET /divers/diff.json
  def diff
	# Synchronize with Google Contacts
	current_administrator.sync_divers(session[:gdata_client]) 
	
	app_key_id 		= session[:app_key_id]
	sync_date 		= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'divers').maximum('created_at');
	new_divers 		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_divers 	= resource.findUpdatedDiff(app_key_id, sync_date)
	@response = {:created => new_divers, :updated => updated_divers}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
