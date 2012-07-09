class DiveEventParticipantsController < SyncedController
  
  def resource
    return current_dive_club.dive_event_participants
  end
  
  def resourceName
	return 'dive_event_participant'
  end

  # GET /dive_event_participants/diff.json
  def diff
	app_key_id 						= session[:app_key_id]
	sync_date 						= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'dive_event_participants').maximum('created_at');
	new_dive_event_participants		= resource.findCreatedDiff(app_key_id, sync_date)
	updated_dive_event_participants	= resource.findUpdatedDiff(app_key_id, sync_date)
	deleted_dive_event_participants	= resource.findDeletedDiff(params[:entries])
	@response = {:created => new_dive_event_participants, :updated => updated_dive_event_participants, :deleted => deleted_dive_event_participants}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
end
