class DiversController < SyncedController
  def resource
	return current_dive_club.divers
  end
  
  def resourceName
	return 'diver'
  end

  # GET /divers/diff.json
  def diff
    
	google_sync_date = current_dive_club.sync_histories.where(:resource_name => 'divers').maximum('created_at');

	# Synchronize with Google Contacts
	if google_sync_date.nil?
		current_administrator.sync_divers(session[:gdata_client])  #Initialize (5000 contacts MAX)
	else
		current_administrator.sync_divers(session[:gdata_client], google_sync_date) #Sync updated contacts only
	end
	
	app_key_id 		= session[:app_key_id]
	sync_date 		= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'divers').maximum('created_at');
	new_divers 		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_divers 	= resource.findUpdatedDiff(app_key_id, sync_date)
	deleted_divers	= resource.findDeletedDiff(params[:entries])
	@response = {:created => new_divers, :updated => updated_divers, :deleted => deleted_divers}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
