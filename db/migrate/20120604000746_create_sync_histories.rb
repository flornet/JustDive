class CreateSyncHistories < ActiveRecord::Migration
  def change
    create_table :sync_histories do |t|
      t.integer :app_key_id
      t.string :resource_name

      t.timestamps
    end
  end
end
