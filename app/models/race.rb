# app/models/race.rb
class Race < ApplicationRecord
  has_many :bets

  def calculate_points
    bets.includes(:user).each do |bet|
      real_position = # get the actual position of the driver
      difference = (real_position - bet.driver_position).abs
      points = calculate_points_for_difference(difference)
      bet.user.update(points: bet.user.points + points)
    end
  end

  private

  def calculate_points_for_difference(difference)
    # Define your own logic to assign points based on the difference
    # You can use if-else statements, switch cases, or any other method
    # to determine the points based on the difference between positions.
    # Example:
    case difference
    when 0
      50
    when 1
      40
    when 2
      30
    # ...
    else
      0
    end
  end
end
