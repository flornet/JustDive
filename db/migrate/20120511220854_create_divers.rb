class CreateDivers < ActiveRecord::Migration
  def change
    create_table :divers do |t|
      t.integer :dive_club_id
      t.string :google_contact_id
      t.string :email
      t.string :firstname
      t.string :lastname
      t.integer :ffessm_level_id
      t.integer :created_by_app_key_id
	  t.integer :last_updated_by_app_key_id
	  t.string :ffessm_licence_number
      t.date :medical_certificate_expires_on

      t.timestamps
    end
    add_index :divers, [:dive_club_id, :email], :unique => true
  end
end
