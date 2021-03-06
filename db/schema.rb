# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120611132003) do

  create_table "administrators", :force => true do |t|
    t.integer  "dive_club_id"
    t.string   "email"
    t.string   "firstname"
    t.string   "lastname"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "administrators", ["dive_club_id", "email"], :name => "index_administrators_on_dive_club_id_and_email", :unique => true

  create_table "app_keys", :force => true do |t|
    t.string   "code"
    t.integer  "administrator_id"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "boat_departures", :force => true do |t|
    t.integer  "dive_event_id"
    t.integer  "boat_id"
    t.date     "departure_date"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "boats", :force => true do |t|
    t.integer  "dive_club_id"
    t.string   "name"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "dive_clubs", :force => true do |t|
    t.string   "name"
    t.string   "ffessm_licence_number"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  add_index "dive_clubs", ["name"], :name => "index_dive_clubs_on_name", :unique => true

  create_table "dive_events", :force => true do |t|
    t.integer  "dive_club_id"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "dive_group_participants", :force => true do |t|
    t.integer  "dive_group_id"
    t.integer  "diver_id"
    t.integer  "dive_role_id"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "dive_groups", :force => true do |t|
    t.integer  "boat_departure_id"
    t.integer  "estimated_dive_time"
    t.integer  "estimated_dive_depth"
    t.integer  "realized_dive_time"
    t.integer  "realized_dive_depth"
    t.date     "immersion_start_time"
    t.date     "immersion_end_time"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "dive_roles", :force => true do |t|
    t.integer  "dive_club_id"
    t.string   "name"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "divers", :force => true do |t|
    t.integer  "dive_club_id"
    t.string   "google_contact_id"
    t.string   "email"
    t.string   "firstname"
    t.string   "lastname"
    t.integer  "ffessm_level_id"
    t.integer  "created_by_app_key_id"
    t.integer  "last_updated_by_app_key_id"
    t.string   "ffessm_licence_number"
    t.date     "medical_certificate_expires_on"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "divers", ["dive_club_id", "email"], :name => "index_divers_on_dive_club_id_and_email", :unique => true

  create_table "ffessm_levels", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "ffessm_levels", ["name"], :name => "index_ffessm_levels_on_name", :unique => true

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "sync_histories", :force => true do |t|
    t.integer  "app_key_id"
    t.string   "resource_name"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

end
