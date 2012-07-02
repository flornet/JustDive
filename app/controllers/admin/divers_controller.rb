class Admin::DiversController < ApplicationController
  layout "admin"
  
  # GET /admin/divers
  # GET /admin/divers.json
  def index
    @admin_divers = Admin::Diver.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_divers }
    end
  end

  # GET /admin/divers/1
  # GET /admin/divers/1.json
  def show
    @admin_diver = Admin::Diver.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_diver }
    end
  end

  # GET /admin/divers/new
  # GET /admin/divers/new.json
  def new
    @admin_diver = Admin::Diver.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_diver }
    end
  end

  # GET /admin/divers/1/edit
  def edit
    @admin_diver = Admin::Diver.find(params[:id])
  end

  # POST /admin/divers
  # POST /admin/divers.json
  def create
    @admin_diver = Admin::Diver.new(params[:admin_diver])

    respond_to do |format|
      if @admin_diver.save
        format.html { redirect_to @admin_diver, :notice => 'Admin::Diver was successfully created.' }
        format.json { render :json => @admin_diver, :status => :created, :location => @admin_diver }
      else
        format.html { render :action => "new" }
        format.json { render :json => @admin_diver.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/divers/1
  # PUT /admin/divers/1.json
  def update
    @admin_diver = Admin::Diver.find(params[:id])

    respond_to do |format|
      if @admin_diver.update_attributes(params[:admin_diver])
        format.html { redirect_to @admin_diver, :notice => 'Admin::Diver was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_diver.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/divers/1
  # DELETE /admin/divers/1.json
  def destroy
    @admin_diver = Admin::Diver.find(params[:id])
    @admin_diver.destroy

    respond_to do |format|
      format.html { redirect_to admin_divers_url }
      format.json { head :no_content }
    end
  end
end