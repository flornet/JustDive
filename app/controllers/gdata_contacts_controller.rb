class GdataContactsController < ApplicationController
  before_filter :administrator_required, :gdata_client_required
  
  def sync_divers
	app_key_id	= session[:app_key_id]
	sync_date 	= SyncHistory.where(:app_key_id => app_key_id, :resource_name => 'divers').maximum('created_at');
	
	if sync_date.nil?
		@divers = current_administrator.sync_divers(session[:gdata_client]) #Initialize (5000 contacts MAX)
	else
		@divers = current_administrator.sync_divers(session[:gdata_client], sync_date) #Sync updated contacts only
	end
	respond_to do |format|
	  format.html { redirect_to :controller => 'divers', :notice => 'Divers were successfully synchronized.' }
      format.json { render :json => @divers, :status => :created, :location => @diver }
    end
  end
end
