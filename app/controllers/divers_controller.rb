class DiversController < ApplicationController
  # GET /divers.json
  def index
    @divers = Diver.all

    respond_to do |format|
      format.json { render :json => @divers }
    end
  end

  # GET /divers/1.json
  def show
    @diver = Diver.find(params[:id])

    respond_to do |format|
      format.json { render :json => @diver }
    end
  end

  # POST /divers.json
  def create
    @diver = Diver.new(params[:diver])

    respond_to do |format|
      if @diver.save
        format.json { render :json => @diver, :status => :created, :location => @diver }
      else
        format.json { render :json => @diver.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /divers/1.json
  def update
    @diver = Diver.find(params[:id])

    respond_to do |format|
      if @diver.update_attributes(params[:diver])
        #format.json { head :no_content }
		format.json { render json: nil, status: :ok }
      else
        format.json { render :json => @diver.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /divers/1.json
  def destroy
    @diver = Diver.find(params[:id])
    @diver.destroy

    respond_to do |format|
      #format.json { head :no_content }
	  format.json { render json: nil, status: :ok }
    end
  end
end
