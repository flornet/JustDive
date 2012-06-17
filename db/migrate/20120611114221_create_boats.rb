class CreateBoats < ActiveRecord::Migration
  def change
    create_table :boats do |t|
      t.integer :dive_club_id
      t.string :name
      t.integer :created_by_app_key_id
	  t.integer :last_updated_by_app_key_id

      t.timestamps
    end
  end
end
