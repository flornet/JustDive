require 'test_helper'

class BoatDeparturesControllerTest < ActionController::TestCase
  setup do
    @boat_departure = boat_departures(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:boat_departures)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create boat_departure" do
    assert_difference('BoatDeparture.count') do
      post :create, boat_departure: { boat_id: @boat_departure.boat_id, departure_date: @boat_departure.departure_date, dive_event_id: @boat_departure.dive_event_id }
    end

    assert_redirected_to boat_departure_path(assigns(:boat_departure))
  end

  test "should show boat_departure" do
    get :show, id: @boat_departure
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @boat_departure
    assert_response :success
  end

  test "should update boat_departure" do
    put :update, id: @boat_departure, boat_departure: { boat_id: @boat_departure.boat_id, departure_date: @boat_departure.departure_date, dive_event_id: @boat_departure.dive_event_id }
    assert_redirected_to boat_departure_path(assigns(:boat_departure))
  end

  test "should destroy boat_departure" do
    assert_difference('BoatDeparture.count', -1) do
      delete :destroy, id: @boat_departure
    end

    assert_redirected_to boat_departures_path
  end
end
