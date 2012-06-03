class CreateSyncHistories < ActiveRecord::Migration
  def change
    create_table :sync_histories do |t|
      t.string :app_key
      t.string :resource_name

      t.timestamps
    end
  end
end
