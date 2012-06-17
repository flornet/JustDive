class SyncHistoriesController < ApplicationController
  # GET /sync_histories
  # GET /sync_histories.json
  def index
    @sync_histories = SyncHistory.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @sync_histories }
    end
  end

  # GET /sync_histories/1
  # GET /sync_histories/1.json
  def show
    @sync_history = SyncHistory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @sync_history }
    end
  end

  # GET /sync_histories/new
  # GET /sync_histories/new.json
  def new
    @sync_history = SyncHistory.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @sync_history }
    end
  end

  # GET /sync_histories/1/edit
  def edit
    @sync_history = SyncHistory.find(params[:id])
  end

  # POST /sync_histories
  # POST /sync_histories.json
  def create
    @sync_history = SyncHistory.new(params[:sync_history])
	@sync_history.app_key_id = session[:app_key_id]
    
	respond_to do |format|
      if @sync_history.save
        format.html { redirect_to @sync_history, :notice => 'Sync history was successfully created.' }
        format.json { render :json => @sync_history, :status => :created, :location => @sync_history }
      else
        format.html { render :action => "new" }
        format.json { render :json => @sync_history.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /sync_histories/1
  # PUT /sync_histories/1.json
  def update
    @sync_history = SyncHistory.find(params[:id])

    respond_to do |format|
      if @sync_history.update_attributes(params[:sync_history])
        format.html { redirect_to @sync_history, :notice => 'Sync history was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @sync_history.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /sync_histories/1
  # DELETE /sync_histories/1.json
  def destroy
    @sync_history = SyncHistory.find(params[:id])
    @sync_history.destroy

    respond_to do |format|
      format.html { redirect_to sync_histories_url }
      format.json { head :no_content }
    end
  end
end
