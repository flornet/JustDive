require 'test_helper'

class DiveEventsControllerTest < ActionController::TestCase
  setup do
    @dive_event = dive_events(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dive_events)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dive_event" do
    assert_difference('DiveEvent.count') do
      post :create, dive_event: { dive_club_id: @dive_event.dive_club_id, end_date: @dive_event.end_date, start_date: @dive_event.start_date }
    end

    assert_redirected_to dive_event_path(assigns(:dive_event))
  end

  test "should show dive_event" do
    get :show, id: @dive_event
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dive_event
    assert_response :success
  end

  test "should update dive_event" do
    put :update, id: @dive_event, dive_event: { dive_club_id: @dive_event.dive_club_id, end_date: @dive_event.end_date, start_date: @dive_event.start_date }
    assert_redirected_to dive_event_path(assigns(:dive_event))
  end

  test "should destroy dive_event" do
    assert_difference('DiveEvent.count', -1) do
      delete :destroy, id: @dive_event
    end

    assert_redirected_to dive_events_path
  end
end
