class Admin::DiveEventParticipantsController < ApplicationController
  layout "admin"
  
  # GET /admin/dive_event_participants
  # GET /admin/dive_event_participants.json
  def index
    @admin_dive_event_participants = Admin::DiveEventParticipant.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_dive_event_participants }
    end
  end

  # GET /admin/dive_event_participants/1
  # GET /admin/dive_event_participants/1.json
  def show
    @admin_dive_event_participant = Admin::DiveEventParticipant.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_dive_event_participant }
    end
  end

  # GET /admin/dive_event_participants/new
  # GET /admin/dive_event_participants/new.json
  def new
    @admin_dive_event_participant = Admin::DiveEventParticipant.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_dive_event_participant }
    end
  end

  # GET /admin/dive_event_participants/1/edit
  def edit
    @admin_dive_event_participant = Admin::DiveEventParticipant.find(params[:id])
  end

  # POST /admin/dive_event_participants
  # POST /admin/dive_event_participants.json
  def create
    @admin_dive_event_participant = Admin::DiveEventParticipant.new(params[:admin_dive_event_participant])

    respond_to do |format|
      if @admin_dive_event_participant.save
        format.html { redirect_to @admin_dive_event_participant, :notice => 'Dive event participant was successfully created.' }
        format.json { render :json => @admin_dive_event_participant, :status => :created, :location => @admin_dive_event_participant }
      else
        format.html { render :action => "new" }
        format.json { render :json => @admin_dive_event_participant.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/dive_event_participants/1
  # PUT /admin/dive_event_participants/1.json
  def update
    @admin_dive_event_participant = Admin::DiveEventParticipant.find(params[:id])

    respond_to do |format|
      if @admin_dive_event_participant.update_attributes(params[:admin_dive_event_participant])
        format.html { redirect_to @admin_dive_event_participant, :notice => 'Dive event participant was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_dive_event_participant.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/dive_event_participants/1
  # DELETE /admin/dive_event_participants/1.json
  def destroy
    @admin_dive_event_participant = Admin::DiveEventParticipant.find(params[:id])
    @admin_dive_event_participant.destroy

    respond_to do |format|
      format.html { redirect_to admin_dive_event_participants_url }
      format.json { head :no_content }
    end
  end
end
