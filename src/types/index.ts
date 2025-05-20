export interface Team {
  id: string;
  name: string;
  points: number;
  position: number;
}

export interface RaceResult {
  driverName: string;
  points: number;
  position: number;
}

export interface Race {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  results?: RaceResult[];
}

export interface Prediction {
  userId: string;
  raceId: string;
  positions: { driverId: string; position: number }[];
  timestamp: string;
}

export interface RaceResult {
  raceId: string;
  positions: { driverId: string; position: number }[];
}

export interface Driver {
  id: string;
  name: string;
  team: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
  rank?: number;
  predictions?: Record<string, { positions: { driverId: string; position: number }[]; pointsEarned: number; isCorrect: boolean }>;
  recentPredictions?: Array<{
    raceName: string;
    prediction: string;
    points: number;
  }>;
}

export interface TeamStanding {
  teamId: string;
  totalPoints: number;
  averagePosition: number;
  raceResults: Record<string, number>; // raceId -> points
}

export interface Championship {
  standings: TeamStanding[];
}
