class ApplicationController < ActionController::Base
  protect_from_forgery
  self.send :helper_method, :current_administrator
  
  private
  def administrator_required
    if !current_administrator
      redirect_to new_identity_path, :notice => "Login is required"
    end
  end
  
  def gdata_client_required
    redirect_to new_identity, :notice => "Login is required (Google session might have expired)" unless !session[:gdata_client].nil?
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
  
end
