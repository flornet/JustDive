class FfessmLevelsController < SyncedController
  def resource
	return current_dive_club.ffessm_levels
  end
  
  def resourceName
	return 'ffessm_level'
  end
  
  # GET /ffessm_levels/diff.json
  def diff
	app_key_id 				= session[:app_key_id]
	sync_date 				= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'ffessm_levels').maximum('created_at');
	new_ffessm_levels		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_ffessm_levels	= resource.findUpdatedDiff(app_key_id, sync_date)
	deleted_ffessm_levels	= resource.findDeletedDiff(app_key_id, sync_date)
	@response = {:created => new_ffessm_levels, :updated => updated_ffessm_levels, :deleted => deleted_ffessm_levels}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
