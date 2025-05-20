class Bet < ApplicationRecord
  belongs_to :user
  belongs_to :race

  validates :user, uniqueness: { scope: :race_id }
  validates :driver_position, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 20 }
end
