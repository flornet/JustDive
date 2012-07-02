class Admin::DiveEventsController < ApplicationController
  layout "admin"
  
  # GET /admin/dive_events
  # GET /admin/dive_events.json
  def index
    @admin_dive_events = Admin::DiveEvent.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_dive_events }
    end
  end

  # GET /admin/dive_events/1
  # GET /admin/dive_events/1.json
  def show
    @admin_dive_event = Admin::DiveEvent.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_dive_event }
    end
  end

  # GET /admin/dive_events/new
  # GET /admin/dive_events/new.json
  def new
    @admin_dive_event = Admin::DiveEvent.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_dive_event }
    end
  end

  # GET /admin/dive_events/1/edit
  def edit
    @admin_dive_event = Admin::DiveEvent.find(params[:id])
  end

  # POST /admin/dive_events
  # POST /admin/dive_events.json
  def create
    @admin_dive_event = Admin::DiveEvent.new(params[:admin_dive_event])

    respond_to do |format|
      if @admin_dive_event.save
        format.html { redirect_to @admin_dive_event, :notice => 'Dive event was successfully created.' }
        format.json { render :json => @admin_dive_event, :status => :created, :location => @admin_dive_event }
      else
        format.html { render :action => "new" }
        format.json { render :json => @admin_dive_event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/dive_events/1
  # PUT /admin/dive_events/1.json
  def update
    @admin_dive_event = Admin::DiveEvent.find(params[:id])

    respond_to do |format|
      if @admin_dive_event.update_attributes(params[:admin_dive_event])
        format.html { redirect_to @admin_dive_event, :notice => 'Dive event was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_dive_event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/dive_events/1
  # DELETE /admin/dive_events/1.json
  def destroy
    @admin_dive_event = Admin::DiveEvent.find(params[:id])
    @admin_dive_event.destroy

    respond_to do |format|
      format.html { redirect_to admin_dive_events_url }
      format.json { head :no_content }
    end
  end
end