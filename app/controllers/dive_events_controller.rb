class DiveEventsController < SyncedController
  def resource
	return current_dive_club.dive_events
  end
  
  def resourceName
	return 'dive_event'
  end

  # GET /dive_event/diff.json
  def diff
	app_key_id 			= session[:app_key_id]
	sync_date 			= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'dive_events').maximum('created_at');
	new_dive_events 	= resource.findCreatedDiff(app_key_id, sync_date)
	updated_dive_events	= resource.findUpdatedDiff(app_key_id, sync_date)
	@response = {:created => new_dive_events, :updated => updated_dive_events}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
