class DiveGroupParticipantsController < ApplicationController
  # GET /dive_group_participants
  # GET /dive_group_participants.json
  def index
    @dive_group_participants = DiveGroupParticipant.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @dive_group_participants }
    end
  end

  # GET /dive_group_participants/1
  # GET /dive_group_participants/1.json
  def show
    @dive_group_participant = DiveGroupParticipant.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @dive_group_participant }
    end
  end

  # GET /dive_group_participants/new
  # GET /dive_group_participants/new.json
  def new
    @dive_group_participant = DiveGroupParticipant.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @dive_group_participant }
    end
  end

  # GET /dive_group_participants/1/edit
  def edit
    @dive_group_participant = DiveGroupParticipant.find(params[:id])
  end

  # POST /dive_group_participants
  # POST /dive_group_participants.json
  def create
    @dive_group_participant = DiveGroupParticipant.new(params[:dive_group_participant])

    respond_to do |format|
      if @dive_group_participant.save
        format.html { redirect_to @dive_group_participant, notice: 'Dive group participant was successfully created.' }
        format.json { render :json => @dive_group_participant, :status => :created, :location => @dive_group_participant }
      else
        format.html { render :action => "new" }
        format.json { render :json => @dive_group_participant.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dive_group_participants/1
  # PUT /dive_group_participants/1.json
  def update
    @dive_group_participant = DiveGroupParticipant.find(params[:id])

    respond_to do |format|
      if @dive_group_participant.update_attributes(params[:dive_group_participant])
        format.html { redirect_to @dive_group_participant, notice: 'Dive group participant was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @dive_group_participant.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dive_group_participants/1
  # DELETE /dive_group_participants/1.json
  def destroy
    @dive_group_participant = DiveGroupParticipant.find(params[:id])
    @dive_group_participant.destroy

    respond_to do |format|
      format.html { redirect_to dive_group_participants_url }
      format.json { head :no_content }
    end
  end
end
