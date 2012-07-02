class Admin::FfessmLevelsController < ApplicationController
  layout "admin"
  
  # GET /admin/ffessm_levels
  # GET /admin/ffessm_levels.json
  def index
    @admin_ffessm_levels = Admin::FfessmLevel.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_ffessm_levels }
    end
  end

  # GET /admin/ffessm_levels/1
  # GET /admin/ffessm_levels/1.json
  def show
    @admin_ffessm_level = Admin::FfessmLevel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_ffessm_level }
    end
  end

  # GET /admin/ffessm_levels/new
  # GET /admin/ffessm_levels/new.json
  def new
    @admin_ffessm_level = Admin::FfessmLevel.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_ffessm_level }
    end
  end

  # GET /admin/ffessm_levels/1/edit
  def edit
    @admin_ffessm_level = Admin::FfessmLevel.find(params[:id])
  end

  # POST /admin/ffessm_levels
  # POST /admin/ffessm_levels.json
  def create
    @admin_ffessm_level = Admin::FfessmLevel.new(params[:admin_ffessm_level])

    respond_to do |format|
      if @admin_ffessm_level.save
        format.html { redirect_to @admin_ffessm_level, :notice => 'Ffessm level was successfully created.' }
        format.json { render :json => @admin_ffessm_level, :status => :created, :location => @admin_ffessm_level }
      else
        format.html { render :action => "new" }
        format.json { render :json => @admin_ffessm_level.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/ffessm_levels/1
  # PUT /admin/ffessm_levels/1.json
  def update
    @admin_ffessm_level = Admin::FfessmLevel.find(params[:id])

    respond_to do |format|
      if @admin_ffessm_level.update_attributes(params[:admin_ffessm_level])
        format.html { redirect_to @admin_ffessm_level, :notice => 'Ffessm level was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_ffessm_level.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/ffessm_levels/1
  # DELETE /admin/ffessm_levels/1.json
  def destroy
    @admin_ffessm_level = Admin::FfessmLevel.find(params[:id])
    @admin_ffessm_level.destroy

    respond_to do |format|
      format.html { redirect_to admin_ffessm_levels_url }
      format.json { head :no_content }
    end
  end
end
