class ApplicationController < ActionController::Base
  protect_from_forgery
  self.send :helper_method, :current_administrator
  
  private
  def administrator_required
    if !current_administrator or session[:app_key_id].nil?
		respond_to do |format|
		  format.html { redirect_to new_identity_path, :notice => "Login is required" }
		  format.json { render :json => "Login is required", :status => :forbidden }
		end
    end
  end
  
  def gdata_client_required
	if session[:gdata_client].nil?
		respond_to do |format|
		  format.html { redirect_to new_identity_path, :notice => "Login is required (Google session might have expired)" }
		  format.json { render :json => "Login is required (Google session might have expired)", :status => :forbidden }
		end
	end
  end
  
  def current_administrator 
    if session[:administrator_id].nil?
      nil
    else
      Administrator.find(session[:administrator_id])
    end
  rescue ActiveRecord::RecordNotFound 
    nil
  end
  
  def current_dive_club
	return current_administrator.dive_club unless current_administrator.nil?
  end
  
end
