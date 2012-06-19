class BoatDeparturesController < SyncedController
  before_filter :administrator_required
  before_filter :dive_event_required, :except => [:diff, :show]

  def dive_event_required
	if !params.nil? and !params[:boat_departure].nil? and !params[:boat_departure][:dive_event_id].nil?
		dive_event = current_dive_club.dive_events.find(params[:boat_departure][:dive_event_id])
		if dive_event
			return true
		else
			return false
		end
	else
		return false
	end
  end
  
  def resource
    if !params.nil? and !params[:boat_departure].nil? and !params[:boat_departure][:dive_event_id].nil?
	    return current_dive_club.dive_events.find(params[:boat_departure][:dive_event_id]).boat_departures
	  else
	    return BoatDeparture
	  end
  end
  
  def resourceName
	return 'boat_departure'
  end

#  # GET /dive_event/diff.json
#  def diff
#	app_key_id 				= session[:app_key_id]
#	sync_date 				= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'boat_departures').maximum('created_at');
#	new_boat_departures 	= BoatDeparture.findCreatedDiff(app_key_id, sync_date)
#	updated_boat_departures	= BoatDeparture.findUpdatedDiff(app_key_id, sync_date)
#	@response = {:created => new_boat_departures, :updated => updated_boat_departures}
#	
#    respond_to do |format|
#      format.json { render :json => @response }
#    end
#  end
end
