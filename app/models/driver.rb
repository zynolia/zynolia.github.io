class Driver < ApplicationRecord
  has_many :race_drivers
  has_many :races, through: :race_drivers
end
