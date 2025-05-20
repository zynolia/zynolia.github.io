class CreateBets < ActiveRecord::Migration[7.0]
  def change
    create_table :bets do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :driver_position

      t.timestamps
    end
  end
end
