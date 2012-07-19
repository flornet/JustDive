class CreateDiveEventParticipants < ActiveRecord::Migration
  def change
    create_table :dive_event_participants do |t|
      t.integer :dive_event_id
      t.integer :diver_id
      t.integer :created_by_app_key_id
      t.integer :last_updated_by_app_key_id
      t.text :comment

      t.timestamps
    end
	
	DiveGroupParticipant.unscoped.all.each do |participant|
		dive_event_participant = DiveEventParticipant.new
		dive_event_participant.dive_event_id = participant.dive_group.boat_departure.dive_event.id
		dive_event_participant.diver_id = participant.diver_id
		dive_event_participant.save
    end
  end
end
