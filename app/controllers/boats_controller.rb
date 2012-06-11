class BoatsController < ApplicationController
  # GET /boats
  # GET /boats.json
  def index
    @boats = Boat.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @boats }
    end
  end

  # GET /boats/1
  # GET /boats/1.json
  def show
    @boat = Boat.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @boat }
    end
  end

  # GET /boats/new
  # GET /boats/new.json
  def new
    @boat = Boat.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @boat }
    end
  end

  # GET /boats/1/edit
  def edit
    @boat = Boat.find(params[:id])
  end

  # POST /boats
  # POST /boats.json
  def create
    @boat = Boat.new(params[:boat])

    respond_to do |format|
      if @boat.save
        format.html { redirect_to @boat, :notice => 'Boat was successfully created.' }
        format.json { render :json => @boat, :status => :created, :location => @boat }
      else
        format.html { render :action => "new" }
        format.json { render :json => @boat.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /boats/1
  # PUT /boats/1.json
  def update
    @boat = Boat.find(params[:id])

    respond_to do |format|
      if @boat.update_attributes(params[:boat])
        format.html { redirect_to @boat, :notice => 'Boat was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @boat.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /boats/1
  # DELETE /boats/1.json
  def destroy
    @boat = Boat.find(params[:id])
    @boat.destroy

    respond_to do |format|
      format.html { redirect_to boats_url }
      format.json { head :no_content }
    end
  end
end
