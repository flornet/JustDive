class DiveEventsController < ApplicationController
  # GET /dive_events
  # GET /dive_events.json
  def index
    @dive_events = DiveEvent.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @dive_events }
    end
  end

  # GET /dive_events/1
  # GET /dive_events/1.json
  def show
    @dive_event = DiveEvent.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @dive_event }
    end
  end

  # GET /dive_events/new
  # GET /dive_events/new.json
  def new
    @dive_event = DiveEvent.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @dive_event }
    end
  end

  # GET /dive_events/1/edit
  def edit
    @dive_event = DiveEvent.find(params[:id])
  end

  # POST /dive_events
  # POST /dive_events.json
  def create
    @dive_event = DiveEvent.new(params[:dive_event])

    respond_to do |format|
      if @dive_event.save
        format.html { redirect_to @dive_event, :notice => 'Dive event was successfully created.' }
        format.json { render :json => @dive_event, :status => :created, :location => @dive_event }
      else
        format.html { render :action => "new" }
        format.json { render :json => @dive_event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dive_events/1
  # PUT /dive_events/1.json
  def update
    @dive_event = DiveEvent.find(params[:id])

    respond_to do |format|
      if @dive_event.update_attributes(params[:dive_event])
        format.html { redirect_to @dive_event, :notice => 'Dive event was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @dive_event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dive_events/1
  # DELETE /dive_events/1.json
  def destroy
    @dive_event = DiveEvent.find(params[:id])
    @dive_event.destroy

    respond_to do |format|
      format.html { redirect_to dive_events_url }
      format.json { head :no_content }
    end
  end
end
