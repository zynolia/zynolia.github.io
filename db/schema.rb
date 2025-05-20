# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_27_161454) do
  create_table "bets", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "driver_position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "race_driver_id", null: false
    t.index ["race_driver_id"], name: "index_bets_on_race_driver_id"
    t.index ["user_id"], name: "index_bets_on_user_id"
  end

  create_table "drivers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "race_drivers", force: :cascade do |t|
    t.integer "race_id", null: false
    t.integer "driver_id", null: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["driver_id"], name: "index_race_drivers_on_driver_id"
    t.index ["race_id"], name: "index_race_drivers_on_race_id"
  end

  create_table "races", force: :cascade do |t|
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.integer "points"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bets", "race_drivers"
  add_foreign_key "bets", "users"
  add_foreign_key "race_drivers", "drivers"
  add_foreign_key "race_drivers", "races"
end
