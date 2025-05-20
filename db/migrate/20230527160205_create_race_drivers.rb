class CreateRaceDrivers < ActiveRecord::Migration[7.0]
  def change
    create_table :race_drivers do |t|
      t.references :race, null: false, foreign_key: true
      t.references :driver, null: false, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
