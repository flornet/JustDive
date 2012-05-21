require 'test_helper'

class AdministratorsControllerTest < ActionController::TestCase
  setup do
    @administrator = administrators(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:administrators)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create administrator" do
    assert_difference('Administrator.count') do
      post :create, :administrator => { :dive_club_id => @administrator.dive_club_id, :email => @administrator.email, :firstname => @administrator.firstname, :lastname => @administrator.lastname }
    end

    assert_redirected_to administrator_path(assigns(:administrator))
  end

  test "should show administrator" do
    get :show, :id => @administrator
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @administrator
    assert_response :success
  end

  test "should update administrator" do
    put :update, :id => @administrator, :administrator => { :dive_club_id => @administrator.dive_club_id, :email => @administrator.email, :firstname => @administrator.firstname, :lastname => @administrator.lastname }
    assert_redirected_to administrator_path(assigns(:administrator))
  end

  test "should destroy administrator" do
    assert_difference('Administrator.count', -1) do
      delete :destroy, :id => @administrator
    end

    assert_redirected_to administrators_path
  end
end
