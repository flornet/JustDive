class CreateDiveClubs < ActiveRecord::Migration
  def change
    create_table :dive_clubs do |t|
      t.string :name
      t.string :ffessm_licence_number

      t.timestamps
    end
    add_index :dive_clubs, :name, :unique => true
  end
end
