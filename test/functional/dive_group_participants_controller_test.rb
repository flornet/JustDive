require 'test_helper'

class DiveGroupParticipantsControllerTest < ActionController::TestCase
  setup do
    @dive_group_participant = dive_group_participants(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dive_group_participants)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dive_group_participant" do
    assert_difference('DiveGroupParticipant.count') do
      post :create, dive_group_participant: { dive_group_id: @dive_group_participant.dive_group_id, dive_role_id: @dive_group_participant.dive_role_id, diver_id: @dive_group_participant.diver_id }
    end

    assert_redirected_to dive_group_participant_path(assigns(:dive_group_participant))
  end

  test "should show dive_group_participant" do
    get :show, id: @dive_group_participant
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dive_group_participant
    assert_response :success
  end

  test "should update dive_group_participant" do
    put :update, id: @dive_group_participant, dive_group_participant: { dive_group_id: @dive_group_participant.dive_group_id, dive_role_id: @dive_group_participant.dive_role_id, diver_id: @dive_group_participant.diver_id }
    assert_redirected_to dive_group_participant_path(assigns(:dive_group_participant))
  end

  test "should destroy dive_group_participant" do
    assert_difference('DiveGroupParticipant.count', -1) do
      delete :destroy, id: @dive_group_participant
    end

    assert_redirected_to dive_group_participants_path
  end
end
