class AddDeletedAtFields < ActiveRecord::Migration
  def change
	add_column :divers, :deleted_at, :datetime
	add_column :divers, :deleted_by_app_key_id, :integer
	
	add_column :ffessm_levels, :deleted_at, :datetime
	add_column :ffessm_levels, :deleted_by_app_key_id, :integer
	
	add_column :dive_events, :deleted_at, :datetime
	add_column :dive_events, :deleted_by_app_key_id, :integer
	
	add_column :boats, :deleted_at, :datetime
	add_column :boats, :deleted_by_app_key_id, :integer
	
	add_column :boat_departures, :deleted_at, :datetime
	add_column :boat_departures, :deleted_by_app_key_id, :integer
	
	add_column :dive_roles, :deleted_at, :datetime
	add_column :dive_roles, :deleted_by_app_key_id, :integer
	
	add_column :dive_group_participants, :deleted_at, :datetime
	add_column :dive_group_participants, :deleted_by_app_key_id, :integer
	
	add_column :dive_groups, :deleted_at, :datetime
	add_column :dive_groups, :deleted_by_app_key_id, :integer
	
	add_column :dive_event_participants, :deleted_at, :datetime
	add_column :dive_event_participants, :deleted_by_app_key_id, :integer
  end
end
