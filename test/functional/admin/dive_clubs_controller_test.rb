require 'test_helper'

class Admin::DiveClubsControllerTest < ActionController::TestCase
  setup do
    @admin_dive_club = admin_dive_clubs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_dive_clubs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_dive_club" do
    assert_difference('Admin::DiveClub.count') do
      post :create, admin_dive_club: {  }
    end

    assert_redirected_to admin_dive_club_path(assigns(:admin_dive_club))
  end

  test "should show admin_dive_club" do
    get :show, id: @admin_dive_club
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_dive_club
    assert_response :success
  end

  test "should update admin_dive_club" do
    put :update, id: @admin_dive_club, admin_dive_club: {  }
    assert_redirected_to admin_dive_club_path(assigns(:admin_dive_club))
  end

  test "should destroy admin_dive_club" do
    assert_difference('Admin::DiveClub.count', -1) do
      delete :destroy, id: @admin_dive_club
    end

    assert_redirected_to admin_dive_clubs_path
  end
end
