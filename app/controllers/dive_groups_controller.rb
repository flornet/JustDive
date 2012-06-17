class DiveGroupsController < ApplicationController
  # GET /dive_groups
  # GET /dive_groups.json
  def index
    @dive_groups = DiveGroup.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @dive_groups }
    end
  end

  # GET /dive_groups/1
  # GET /dive_groups/1.json
  def show
    @dive_group = DiveGroup.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @dive_group }
    end
  end

  # GET /dive_groups/new
  # GET /dive_groups/new.json
  def new
    @dive_group = DiveGroup.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @dive_group }
    end
  end

  # GET /dive_groups/1/edit
  def edit
    @dive_group = DiveGroup.find(params[:id])
  end

  # POST /dive_groups
  # POST /dive_groups.json
  def create
    @dive_group = DiveGroup.new(params[:dive_group])

    respond_to do |format|
      if @dive_group.save
        format.html { redirect_to @dive_group, notice: 'Dive group was successfully created.' }
        format.json { render :json => @dive_group, :status => :created, :location => @dive_group }
      else
        format.html { render :action => "new" }
        format.json { render :json => @dive_group.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dive_groups/1
  # PUT /dive_groups/1.json
  def update
    @dive_group = DiveGroup.find(params[:id])

    respond_to do |format|
      if @dive_group.update_attributes(params[:dive_group])
        format.html { redirect_to @dive_group, notice: 'Dive group was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @dive_group.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dive_groups/1
  # DELETE /dive_groups/1.json
  def destroy
    @dive_group = DiveGroup.find(params[:id])
    @dive_group.destroy

    respond_to do |format|
      format.html { redirect_to dive_groups_url }
      format.json { head :no_content }
    end
  end
end
