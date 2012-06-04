require 'test_helper'

class SyncHistoriesControllerTest < ActionController::TestCase
  setup do
    @sync_history = sync_histories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sync_histories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sync_history" do
    assert_difference('SyncHistory.count') do
      post :create, sync_history: { app_key_id: @sync_history.app_key_id, last_synced_on: @sync_history.last_synced_on, resource_name: @sync_history.resource_name }
    end

    assert_redirected_to sync_history_path(assigns(:sync_history))
  end

  test "should show sync_history" do
    get :show, id: @sync_history
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sync_history
    assert_response :success
  end

  test "should update sync_history" do
    put :update, id: @sync_history, sync_history: { app_key_id: @sync_history.app_key_id, last_synced_on: @sync_history.last_synced_on, resource_name: @sync_history.resource_name }
    assert_redirected_to sync_history_path(assigns(:sync_history))
  end

  test "should destroy sync_history" do
    assert_difference('SyncHistory.count', -1) do
      delete :destroy, id: @sync_history
    end

    assert_redirected_to sync_histories_path
  end
end
