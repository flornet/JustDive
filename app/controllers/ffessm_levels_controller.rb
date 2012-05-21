class FfessmLevelsController < ApplicationController
  # GET /ffessm_levels
  # GET /ffessm_levels.json
  def index
    @ffessm_levels = FfessmLevel.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @ffessm_levels }
    end
  end

  # GET /ffessm_levels/1
  # GET /ffessm_levels/1.json
  def show
    @ffessm_level = FfessmLevel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @ffessm_level }
    end
  end

  # GET /ffessm_levels/new
  # GET /ffessm_levels/new.json
  def new
    @ffessm_level = FfessmLevel.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @ffessm_level }
    end
  end

  # GET /ffessm_levels/1/edit
  def edit
    @ffessm_level = FfessmLevel.find(params[:id])
  end

  # POST /ffessm_levels
  # POST /ffessm_levels.json
  def create
    @ffessm_level = FfessmLevel.new(params[:ffessm_level])

    respond_to do |format|
      if @ffessm_level.save
        format.html { redirect_to @ffessm_level, :notice => 'Ffessm level was successfully created.' }
        format.json { render :json => @ffessm_level, :status => :created, :location => @ffessm_level }
      else
        format.html { render :action => "new" }
        format.json { render :json => @ffessm_level.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ffessm_levels/1
  # PUT /ffessm_levels/1.json
  def update
    @ffessm_level = FfessmLevel.find(params[:id])

    respond_to do |format|
      if @ffessm_level.update_attributes(params[:ffessm_level])
        format.html { redirect_to @ffessm_level, :notice => 'Ffessm level was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @ffessm_level.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ffessm_levels/1
  # DELETE /ffessm_levels/1.json
  def destroy
    @ffessm_level = FfessmLevel.find(params[:id])
    @ffessm_level.destroy

    respond_to do |format|
      format.html { redirect_to ffessm_levels_url }
      format.json { head :no_content }
    end
  end
end
