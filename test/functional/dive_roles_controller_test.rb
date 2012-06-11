require 'test_helper'

class DiveRolesControllerTest < ActionController::TestCase
  setup do
    @dive_role = dive_roles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dive_roles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dive_role" do
    assert_difference('DiveRole.count') do
      post :create, dive_role: { dive_club_id: @dive_role.dive_club_id, name: @dive_role.name }
    end

    assert_redirected_to dive_role_path(assigns(:dive_role))
  end

  test "should show dive_role" do
    get :show, id: @dive_role
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dive_role
    assert_response :success
  end

  test "should update dive_role" do
    put :update, id: @dive_role, dive_role: { dive_club_id: @dive_role.dive_club_id, name: @dive_role.name }
    assert_redirected_to dive_role_path(assigns(:dive_role))
  end

  test "should destroy dive_role" do
    assert_difference('DiveRole.count', -1) do
      delete :destroy, id: @dive_role
    end

    assert_redirected_to dive_roles_path
  end
end
