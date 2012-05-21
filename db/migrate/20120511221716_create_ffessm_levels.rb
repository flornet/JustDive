class CreateFfessmLevels < ActiveRecord::Migration
  def change
    create_table :ffessm_levels do |t|
      t.string :name

      t.timestamps
    end
    
    add_index :ffessm_levels, :name, :unique => true
  end
end
