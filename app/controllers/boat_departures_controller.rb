class BoatDeparturesController < ApplicationController
  # GET /boat_departures
  # GET /boat_departures.json
  def index
    @boat_departures = BoatDeparture.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @boat_departures }
    end
  end

  # GET /boat_departures/1
  # GET /boat_departures/1.json
  def show
    @boat_departure = BoatDeparture.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @boat_departure }
    end
  end

  # GET /boat_departures/new
  # GET /boat_departures/new.json
  def new
    @boat_departure = BoatDeparture.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @boat_departure }
    end
  end

  # GET /boat_departures/1/edit
  def edit
    @boat_departure = BoatDeparture.find(params[:id])
  end

  # POST /boat_departures
  # POST /boat_departures.json
  def create
    @boat_departure = BoatDeparture.new(params[:boat_departure])

    respond_to do |format|
      if @boat_departure.save
        format.html { redirect_to @boat_departure, :notice => 'Boat departure was successfully created.' }
        format.json { render :json => @boat_departure, :status => :created, :location => @boat_departure }
      else
        format.html { render :action => "new" }
        format.json { render :json => @boat_departure.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /boat_departures/1
  # PUT /boat_departures/1.json
  def update
    @boat_departure = BoatDeparture.find(params[:id])

    respond_to do |format|
      if @boat_departure.update_attributes(params[:boat_departure])
        format.html { redirect_to @boat_departure, :notice => 'Boat departure was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @boat_departure.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /boat_departures/1
  # DELETE /boat_departures/1.json
  def destroy
    @boat_departure = BoatDeparture.find(params[:id])
    @boat_departure.destroy

    respond_to do |format|
      format.html { redirect_to boat_departures_url }
      format.json { head :no_content }
    end
  end
end
