class CreateAdministrators < ActiveRecord::Migration
  def change
    create_table :administrators do |t|
      t.integer :dive_club_id
      t.string :email
      t.string :firstname
      t.string :lastname

      t.timestamps
    end
    add_index :administrators, [:dive_club_id, :email], :unique => true
  end
end
