class AlterFfessmLevels < ActiveRecord::Migration
  def change
	add_column :ffessm_levels, :dive_club_id, :integer
	add_column :ffessm_levels, :created_by_app_key_id, :integer
	add_column :ffessm_levels, :last_updated_by_app_key_id, :integer	
	
	# Attach existing Levels to the first dive club
	main_dive_club = DiveClub.first
	FfessmLevel.unscoped.all.each do |level|
      level.update_attributes!(:dive_club_id => main_dive_club.id)
    end
  end
end
