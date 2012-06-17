class CreateDiveGroupParticipants < ActiveRecord::Migration
  def change
    create_table :dive_group_participants do |t|
      t.integer :dive_group_id
      t.integer :diver_id
      t.integer :dive_role_id
      t.integer :created_by_app_key_id
	  t.integer :last_updated_by_app_key_id

      t.timestamps
    end
  end
end
