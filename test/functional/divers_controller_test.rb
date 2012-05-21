require 'test_helper'

class DiversControllerTest < ActionController::TestCase
  setup do
    @diver = divers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:divers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create diver" do
    assert_difference('Diver.count') do
      post :create, :diver => { :dive_club_id => @diver.dive_club_id, :email => @diver.email, :ffessm_level_id => @diver.ffessm_level_id, :ffessm_licence_number => @diver.ffessm_licence_number, :firstname => @diver.firstname, :google_contact_id => @diver.google_contact_id, :lastname => @diver.lastname, :medical_certificate_expires_on => @diver.medical_certificate_expires_on }
    end

    assert_redirected_to diver_path(assigns(:diver))
  end

  test "should show diver" do
    get :show, :id => @diver
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @diver
    assert_response :success
  end

  test "should update diver" do
    put :update, :id => @diver, :diver => { :dive_club_id => @diver.dive_club_id, :email => @diver.email, :ffessm_level_id => @diver.ffessm_level_id, :ffessm_licence_number => @diver.ffessm_licence_number, :firstname => @diver.firstname, :google_contact_id => @diver.google_contact_id, :lastname => @diver.lastname, :medical_certificate_expires_on => @diver.medical_certificate_expires_on }
    assert_redirected_to diver_path(assigns(:diver))
  end

  test "should destroy diver" do
    assert_difference('Diver.count', -1) do
      delete :destroy, :id => @diver
    end

    assert_redirected_to divers_path
  end
end
