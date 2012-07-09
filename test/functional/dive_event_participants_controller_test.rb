require 'test_helper'

class DiveEventParticipantsControllerTest < ActionController::TestCase
  setup do
    @dive_event_participant = dive_event_participants(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dive_event_participants)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dive_event_participant" do
    assert_difference('DiveEventParticipant.count') do
      post :create, dive_event_participant: { comment: @dive_event_participant.comment, created_by_app_key_id: @dive_event_participant.created_by_app_key_id, dive_event_id: @dive_event_participant.dive_event_id, diver_id: @dive_event_participant.diver_id, last_updated_by_app_key_id: @dive_event_participant.last_updated_by_app_key_id }
    end

    assert_redirected_to dive_event_participant_path(assigns(:dive_event_participant))
  end

  test "should show dive_event_participant" do
    get :show, id: @dive_event_participant
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dive_event_participant
    assert_response :success
  end

  test "should update dive_event_participant" do
    put :update, id: @dive_event_participant, dive_event_participant: { comment: @dive_event_participant.comment, created_by_app_key_id: @dive_event_participant.created_by_app_key_id, dive_event_id: @dive_event_participant.dive_event_id, diver_id: @dive_event_participant.diver_id, last_updated_by_app_key_id: @dive_event_participant.last_updated_by_app_key_id }
    assert_redirected_to dive_event_participant_path(assigns(:dive_event_participant))
  end

  test "should destroy dive_event_participant" do
    assert_difference('DiveEventParticipant.count', -1) do
      delete :destroy, id: @dive_event_participant
    end

    assert_redirected_to dive_event_participants_path
  end
end
