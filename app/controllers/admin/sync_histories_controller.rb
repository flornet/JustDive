class Admin::SyncHistoriesController < ApplicationController
  layout "admin"
  
  # GET /admin/sync_histories
  # GET /admin/sync_histories.json
  def index
    @admin_sync_histories = Admin::SyncHistory.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_sync_histories }
    end
  end

  # GET /admin/sync_histories/1
  # GET /admin/sync_histories/1.json
  def show
    @admin_sync_history = Admin::SyncHistory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_sync_history }
    end
  end

  # GET /admin/sync_histories/new
  # GET /admin/sync_histories/new.json
  def new
    @admin_sync_history = Admin::SyncHistory.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_sync_history }
    end
  end

  # GET /admin/sync_histories/1/edit
  def edit
    @admin_sync_history = Admin::SyncHistory.find(params[:id])
  end

  # POST /admin/sync_histories
  # POST /admin/sync_histories.json
  def create
    @admin_sync_history = Admin::SyncHistory.new(params[:admin_sync_history])
	@admin_sync_history.app_key_id = session[:app_key_id]
    
	respond_to do |format|
      if @admin_sync_history.save
        format.html { redirect_to @admin_sync_history, :notice => 'Sync history was successfully created.' }
        format.json { render :json => @admin_sync_history, :status => :created, :location => @admin_sync_history }
      else
        format.html { render :action => "new" }
        format.json { render :json => @admin_sync_history.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/sync_histories/1
  # PUT /admin/sync_histories/1.json
  def update
    @admin_sync_history = Admin::SyncHistory.find(params[:id])

    respond_to do |format|
      if @admin_sync_history.update_attributes(params[:admin_sync_history])
        format.html { redirect_to @admin_sync_history, :notice => 'Sync history was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_sync_history.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/sync_histories/1
  # DELETE /admin/sync_histories/1.json
  def destroy
    @admin_sync_history = Admin::SyncHistory.find(params[:id])
    @admin_sync_history.destroy

    respond_to do |format|
      format.html { redirect_to admin_sync_histories_url }
      format.json { head :no_content }
    end
  end
end
