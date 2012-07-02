class Admin::DiveClubsController < ApplicationController
  layout "admin"
  
  # GET /admin/dive_clubs
  # GET /admin/dive_clubs.json
  def index
    @admin_dive_clubs = Admin::DiveClub.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @admin_dive_clubs }
    end
  end

  # GET /admin/dive_clubs/1
  # GET /admin/dive_clubs/1.json
  def show
    @admin_dive_club = Admin::DiveClub.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @admin_dive_club }
    end
  end

  # GET /admin/dive_clubs/new
  # GET /admin/dive_clubs/new.json
  def new
    @admin_dive_club = Admin::DiveClub.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @admin_dive_club }
    end
  end

  # GET /admin/dive_clubs/1/edit
  def edit
    @admin_dive_club = Admin::DiveClub.find(params[:id])
  end

  # POST /admin/dive_clubs
  # POST /admin/dive_clubs.json
  def create
    @admin_dive_club = Admin::DiveClub.new(params[:admin_dive_club])

    respond_to do |format|
      if @admin_dive_club.save
        format.html { redirect_to @admin_dive_club, notice: 'Dive club was successfully created.' }
        format.json { render json: @admin_dive_club, status: :created, location: @admin_dive_club }
      else
        format.html { render action: "new" }
        format.json { render json: @admin_dive_club.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /admin/dive_clubs/1
  # PUT /admin/dive_clubs/1.json
  def update
    @admin_dive_club = Admin::DiveClub.find(params[:id])

    respond_to do |format|
      if @admin_dive_club.update_attributes(params[:admin_dive_club])
        format.html { redirect_to @admin_dive_club, notice: 'Dive club was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @admin_dive_club.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/dive_clubs/1
  # DELETE /admin/dive_clubs/1.json
  def destroy
    @admin_dive_club = Admin::DiveClub.find(params[:id])
    @admin_dive_club.destroy

    respond_to do |format|
      format.html { redirect_to admin_dive_clubs_url }
      format.json { head :no_content }
    end
  end
end
