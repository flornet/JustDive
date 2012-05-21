class DiveClubsController < ApplicationController
  # GET /dive_clubs
  # GET /dive_clubs.json
  def index
    @dive_clubs = DiveClub.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @dive_clubs }
    end
  end

  # GET /dive_clubs/1
  # GET /dive_clubs/1.json
  def show
    @dive_club = DiveClub.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @dive_club }
    end
  end

  # GET /dive_clubs/new
  # GET /dive_clubs/new.json
  def new
    @dive_club = DiveClub.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @dive_club }
    end
  end

  # GET /dive_clubs/1/edit
  def edit
    @dive_club = DiveClub.find(params[:id])
  end

  # POST /dive_clubs
  # POST /dive_clubs.json
  def create
    @dive_club = DiveClub.new(params[:dive_club])

    respond_to do |format|
      if @dive_club.save
        format.html { redirect_to @dive_club, :notice => 'Dive club was successfully created.' }
        format.json { render :json => @dive_club, :status => :created, :location => @dive_club }
      else
        format.html { render :action => "new" }
        format.json { render :json => @dive_club.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dive_clubs/1
  # PUT /dive_clubs/1.json
  def update
    @dive_club = DiveClub.find(params[:id])

    respond_to do |format|
      if @dive_club.update_attributes(params[:dive_club])
        format.html { redirect_to @dive_club, :notice => 'Dive club was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @dive_club.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dive_clubs/1
  # DELETE /dive_clubs/1.json
  def destroy
    @dive_club = DiveClub.find(params[:id])
    @dive_club.destroy

    respond_to do |format|
      format.html { redirect_to dive_clubs_url }
      format.json { head :no_content }
    end
  end
end
