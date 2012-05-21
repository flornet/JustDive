require 'test_helper'

class DiveClubsControllerTest < ActionController::TestCase
  setup do
    @dive_club = dive_clubs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dive_clubs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dive_club" do
    assert_difference('DiveClub.count') do
      post :create, :dive_club => { :ffessm_licence_number => @dive_club.ffessm_licence_number, :name => @dive_club.name }
    end

    assert_redirected_to dive_club_path(assigns(:dive_club))
  end

  test "should show dive_club" do
    get :show, :id => @dive_club
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @dive_club
    assert_response :success
  end

  test "should update dive_club" do
    put :update, :id => @dive_club, :dive_club => { :ffessm_licence_number => @dive_club.ffessm_licence_number, :name => @dive_club.name }
    assert_redirected_to dive_club_path(assigns(:dive_club))
  end

  test "should destroy dive_club" do
    assert_difference('DiveClub.count', -1) do
      delete :destroy, :id => @dive_club
    end

    assert_redirected_to dive_clubs_path
  end
end
