require 'test_helper'

class DiveGroupsControllerTest < ActionController::TestCase
  setup do
    @dive_group = dive_groups(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dive_groups)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dive_group" do
    assert_difference('DiveGroup.count') do
      post :create, dive_group: { boat_departure_id: @dive_group.boat_departure_id, estimated_dive_depth: @dive_group.estimated_dive_depth, estimated_dive_time: @dive_group.estimated_dive_time, immersion_end_time: @dive_group.immersion_end_time, immersion_start_time: @dive_group.immersion_start_time, realized_dive_depth: @dive_group.realized_dive_depth, realized_dive_time: @dive_group.realized_dive_time }
    end

    assert_redirected_to dive_group_path(assigns(:dive_group))
  end

  test "should show dive_group" do
    get :show, id: @dive_group
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dive_group
    assert_response :success
  end

  test "should update dive_group" do
    put :update, id: @dive_group, dive_group: { boat_departure_id: @dive_group.boat_departure_id, estimated_dive_depth: @dive_group.estimated_dive_depth, estimated_dive_time: @dive_group.estimated_dive_time, immersion_end_time: @dive_group.immersion_end_time, immersion_start_time: @dive_group.immersion_start_time, realized_dive_depth: @dive_group.realized_dive_depth, realized_dive_time: @dive_group.realized_dive_time }
    assert_redirected_to dive_group_path(assigns(:dive_group))
  end

  test "should destroy dive_group" do
    assert_difference('DiveGroup.count', -1) do
      delete :destroy, id: @dive_group
    end

    assert_redirected_to dive_groups_path
  end
end
