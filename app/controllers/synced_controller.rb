class SyncedController < ApplicationController
  before_filter :administrator_required
  
  def resource
	return nil
  end
  
  def resourceName
	return ''
  end
  
  # GET /divers/diff.json
  def diff
	@response = {:created => [], :updated => [], :deleted => []}
	
    respond_to do |format|
      format.json { render :json => @response }
    end
  end
  
  
  # GET /[model].json
  def index
	@models = resource.find(:all)
    
    respond_to do |format|
      format.json { render :json => @models }
    end
  end
  
  # GET /[model]/1.json
  def show
    @model = resource.find(params[:id])

    respond_to do |format|
      format.json { render :json => @model }
    end
  end

  # POST /[model].json
  def create
	@model = resource.build(params[resourceName])
	if @model.created_by_app_key_id.nil?
		@model.created_by_app_key_id = session[:app_key_id]
	end

    respond_to do |format|
      if @model.save
        format.json { render :json => @model, :status => :created, :location => @model }
      else
        format.json { render :json => @model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /[model]/1.json
  def update
    @model = resource.find(params[:id])
	@model.last_updated_by_app_key_id = session[:app_key_id]
	
    respond_to do |format|
      if @model.update_attributes(params[resourceName])
        format.json { render :json => @model, :status => :ok, :location => @model }
      else
        format.json { render :json => @model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /[model]/1.json
  def destroy
    @model = resource.find(params[:id])
	@model.deleted_by_app_key_id = session[:app_key_id]
	@model.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end