class AddStopLengthFields < ActiveRecord::Migration
  def change
	remove_column :dive_groups, :immersion_end_time
	
	add_column :dive_groups, :m9_stop_time, :integer
	add_column :dive_groups, :m6_stop_time, :integer	
	add_column :dive_groups, :m3_stop_time, :integer
  end
end
