class GdataContactsController < ApplicationController
  before_filter :administrator_required, :gdata_client_required
  
  def sync_divers
    @divers = current_administrator.sync_divers(session[:gdata_client])
	
	respond_to do |format|
      format.html { redirect_to :controller => 'divers', :notice => 'Divers were successfully synchronized.' }
      format.json { render :json => @divers, :status => :created, :location => @diver }
    end
  end
end
