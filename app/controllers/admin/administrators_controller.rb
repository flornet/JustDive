class Admin::AdministratorsController < ApplicationController
  layout "admin"
  
  # GET /admin/administrators
  # GET /admin/administrators.json
  def index
    @admin_administrators = Admin::Administrator.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_administrators }
    end
  end

  # GET /admin/administrators/1
  # GET /admin/administrators/1.json
  def show
    @admin_administrator = Admin::Administrator.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_administrator }
    end
  end

  # GET /admin/administrators/new
  # GET /admin/administrators/new.json
  def new
    @admin_administrator = Admin::Administrator.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_administrator }
    end
  end

  # GET /admin/administrators/1/edit
  def edit
    @admin_administrator = Admin::Administrator.find(params[:id])
  end

  # POST /admin/administrators
  # POST /admin/administrators.json
  def create
    @admin_administrator = Admin::Administrator.new(params[:admin_administrator])

    respond_to do |format|
      if @admin_administrator.save
        format.html { redirect_to @admin_administrator, :notice => 'Administrator was successfully created.' }
        format.json { render :json => @admin_administrator, :status => :created, :location => @admin_administrator }
      else
        format.html { render :action => "new" }
        format.json { render :json => @admin_administrator.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/administrators/1
  # PUT /admin/administrators/1.json
  def update
    @admin_administrator = Admin::Administrator.find(params[:id])

    respond_to do |format|
      if @admin_administrator.update_attributes(params[:admin_administrator])
        format.html { redirect_to @admin_administrator, :notice => 'Administrator was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_administrator.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/administrators/1
  # DELETE /admin/administrators/1.json
  def destroy
    @admin_administrator = Admin::Administrator.find(params[:id])
    @admin_administrator.destroy

    respond_to do |format|
      format.html { redirect_to admin_administrators_url }
      format.json { head :no_content }
    end
  end
end
