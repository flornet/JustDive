class AlterDiveGroup < ActiveRecord::Migration
  def change
	remove_column :dive_groups, :immersion_start_time
	add_column :dive_groups, :immersion_start_time, :time
  end
end
