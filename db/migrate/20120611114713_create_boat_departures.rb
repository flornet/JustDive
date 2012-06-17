class CreateBoatDepartures < ActiveRecord::Migration
  def change
    create_table :boat_departures do |t|
      t.integer :dive_event_id
      t.integer :boat_id
      t.date :departure_date
      t.integer :created_by_app_key_id
	  t.integer :last_updated_by_app_key_id

      t.timestamps
    end
  end
end
