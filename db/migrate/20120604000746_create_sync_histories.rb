class CreateSyncHistories < ActiveRecord::Migration
  def change
    create_table :sync_histories do |t|
      t.integer :app_key_id
      t.string :resource_name
      t.date :last_synced_on

      t.timestamps
    end
  end
end
