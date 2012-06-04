class AppKeysController < ApplicationController
  # GET /app_keys
  # GET /app_keys.json
  def index
    @app_keys = AppKey.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @app_keys }
    end
  end

  # GET /app_keys/1
  # GET /app_keys/1.json
  def show
    @app_key = AppKey.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @app_key }
    end
  end

  # GET /app_keys/new
  # GET /app_keys/new.json
  def new
    @app_key = AppKey.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @app_key }
    end
  end

  # GET /app_keys/1/edit
  def edit
    @app_key = AppKey.find(params[:id])
  end

  # POST /app_keys
  # POST /app_keys.json
  def create
    @app_key = AppKey.new(params[:app_key])

    respond_to do |format|
      if @app_key.save
        format.html { redirect_to @app_key, notice: 'App key was successfully created.' }
        format.json { render json: @app_key, status: :created, location: @app_key }
      else
        format.html { render action: "new" }
        format.json { render json: @app_key.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /app_keys/1
  # PUT /app_keys/1.json
  def update
    @app_key = AppKey.find(params[:id])

    respond_to do |format|
      if @app_key.update_attributes(params[:app_key])
        format.html { redirect_to @app_key, notice: 'App key was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @app_key.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /app_keys/1
  # DELETE /app_keys/1.json
  def destroy
    @app_key = AppKey.find(params[:id])
    @app_key.destroy

    respond_to do |format|
      format.html { redirect_to app_keys_url }
      format.json { head :no_content }
    end
  end
end
