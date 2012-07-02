class Admin::AppKeysController < ApplicationController
  layout "admin"
  
  # GET /admin/app_keys
  # GET /admin/app_keys.json
  def index
    @admin_app_keys = Admin::AppKey.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @admin_app_keys }
    end
  end

  # GET /admin/app_keys/1
  # GET /admin/app_keys/1.json
  def show
    @admin_app_key = Admin::AppKey.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @admin_app_key }
    end
  end

  # GET /admin/app_keys/new
  # GET /admin/app_keys/new.json
  def new
    @admin_app_key = Admin::AppKey.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @admin_app_key }
    end
  end

  # GET /admin/app_keys/1/edit
  def edit
    @admin_app_key = Admin::AppKey.find(params[:id])
  end

  # POST /admin/app_keys
  # POST /admin/app_keys.json
  def create
    @admin_app_key = Admin::AppKey.new(params[:admin_app_key])

    respond_to do |format|
      if @admin_app_key.save
        format.html { redirect_to @admin_app_key, :notice => 'App key was successfully created.' }
        format.json { render :json => @admin_app_key, :status => :created, :location => @admin_app_key }
      else
        format.html { render :action =>"new" }
        format.json { render :json => @admin_app_key.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /admin/app_keys/1
  # PUT /admin/app_keys/1.json
  def update
    @admin_app_key = Admin::AppKey.find(params[:id])

    respond_to do |format|
      if @admin_app_key.update_attributes(params[:admin_app_key])
        format.html { redirect_to @admin_app_key, :notice => 'App key was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @admin_app_key.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/app_keys/1
  # DELETE /admin/app_keys/1.json
  def destroy
    @admin_app_key = Admin::AppKey.find(params[:id])
    @admin_app_key.destroy

    respond_to do |format|
      format.html { redirect_to admin_app_keys_url }
      format.json { head :no_content }
    end
  end
end
