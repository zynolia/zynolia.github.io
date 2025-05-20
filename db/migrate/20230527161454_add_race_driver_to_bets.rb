class AddRaceDriverToBets < ActiveRecord::Migration[7.0]
  def change
    add_reference :bets, :race_driver, null: false, foreign_key: true
  end
end
