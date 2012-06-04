class CreateAppKeys < ActiveRecord::Migration
  def change
    create_table :app_keys do |t|
      t.string :code
      t.integer :administrator_id

      t.timestamps
    end
  end
end
