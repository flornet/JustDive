require 'test_helper'

class FfessmLevelsControllerTest < ActionController::TestCase
  setup do
    @ffessm_level = ffessm_levels(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ffessm_levels)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ffessm_level" do
    assert_difference('FfessmLevel.count') do
      post :create, :ffessm_level => { :name => @ffessm_level.name }
    end

    assert_redirected_to ffessm_level_path(assigns(:ffessm_level))
  end

  test "should show ffessm_level" do
    get :show, :id => @ffessm_level
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @ffessm_level
    assert_response :success
  end

  test "should update ffessm_level" do
    put :update, :id => @ffessm_level, :ffessm_level => { :name => @ffessm_level.name }
    assert_redirected_to ffessm_level_path(assigns(:ffessm_level))
  end

  test "should destroy ffessm_level" do
    assert_difference('FfessmLevel.count', -1) do
      delete :destroy, :id => @ffessm_level
    end

    assert_redirected_to ffessm_levels_path
  end
end
