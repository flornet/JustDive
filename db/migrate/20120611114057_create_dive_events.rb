class CreateDiveEvents < ActiveRecord::Migration
  def change
    create_table :dive_events do |t|
      t.integer :dive_club_id
      t.date :start_date
      t.date :end_date
      t.integer :created_by_app_key_id
	  t.integer :last_updated_by_app_key_id

      t.timestamps
    end
  end
end
