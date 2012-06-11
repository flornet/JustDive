class CreateDiveGroups < ActiveRecord::Migration
  def change
    create_table :dive_groups do |t|
      t.integer :boat_departure_id
      t.integer :estimated_dive_time
      t.integer :estimated_dive_depth
      t.integer :realized_dive_time
      t.integer :realized_dive_depth
      t.date :immersion_start_time
      t.date :immersion_end_time
      t.integer :created_by_app_key_id
	  t.integer :last_updated_by_app_key_id

      t.timestamps
    end
  end
end
