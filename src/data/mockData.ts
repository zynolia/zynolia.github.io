import { Race, User, Driver, RaceResult, TeamStanding } from '../types';

export const races: Race[] = [
  { id: 'australia', name: 'Australia', date: '2025-03-16', completed: true },
  { id: 'china', name: 'China', date: '2025-03-30', completed: true },
  { id: 'japan', name: 'Japan', date: '2025-04-13', completed: true },
  { id: 'bahrain', name: 'Bahrain', date: '2025-04-27', completed: true },
  { id: 'saudi-arabia', name: 'Saudi Arabia', date: '2025-05-04', completed: true },
  { id: 'miami', name: 'Miami', date: '2025-05-11', completed: true },
  { id: 'emilia-romagna', name: 'Emilia-Romagna', date: '2025-05-18', completed: true },
  { id: 'monaco', name: 'Monaco', date: '2025-05-25', completed: false },
  { id: 'spain', name: 'Spain', date: '2025-06-08', completed: false },
  { id: 'canada', name: 'Canada', date: '2025-06-22', completed: false },
  { id: 'austria', name: 'Austria', date: '2025-06-29', completed: false },
  { id: 'united-kingdom', name: 'United Kingdom', date: '2025-07-06', completed: false },
  { id: 'belgium', name: 'Belgium', date: '2025-07-27', completed: false },
  { id: 'hungary', name: 'Hungary', date: '2025-08-03', completed: false },
  { id: 'netherlands', name: 'Netherlands', date: '2025-08-24', completed: false },
  { id: 'italy', name: 'Italy', date: '2025-09-07', completed: false },
  { id: 'azerbaijan', name: 'Azerbaijan', date: '2025-09-14', completed: false },
  { id: 'singapore', name: 'Singapore', date: '2025-09-21', completed: false },
  { id: 'usa', name: 'USA', date: '2025-10-19', completed: false },
  { id: 'mexico', name: 'Mexico', date: '2025-10-26', completed: false },
  { id: 'brazil', name: 'Brazil', date: '2025-11-09', completed: false },
  { id: 'las-vegas', name: 'Las Vegas', date: '2025-11-23', completed: false },
  { id: 'qatar', name: 'Qatar', date: '2025-11-30', completed: false },
  { id: 'abu-dhabi', name: 'Abu Dhabi', date: '2025-12-07', completed: false },
];

export const users: User[] = [
  { id: 'MAB', name: 'MAB', email: 'mab@example.com', totalPoints: 1827 },
  { id: 'ART', name: 'ART', email: 'art@example.com', totalPoints: 1858 },
  { id: 'MAD', name: 'MAD', email: 'mad@example.com', totalPoints: 1831 },
  { id: 'OSH', name: 'OSH', email: 'osh@example.com', totalPoints: 1822 },
  { id: 'ZUZ', name: 'ZUZ', email: 'zuz@example.com', totalPoints: 1863 },
  { id: 'DRS', name: 'DRS', email: 'drs@example.com', totalPoints: 1645 },
  { id: 'KOR', name: 'KOR', email: 'kor@example.com', totalPoints: 1830 },
  { id: 'RRR', name: 'RRR', email: 'rrr@example.com', totalPoints: 1744 },
  { id: 'BEE', name: 'BEE', email: 'bee@example.com', totalPoints: 1812 },
  { id: 'ASD', name: 'ASD', email: 'asd@example.com', totalPoints: 1754 },
  { id: 'SSS', name: 'SSS', email: 'sss@example.com', totalPoints: 1841 },
  { id: 'CCV', name: 'CCV', email: 'ccv@example.com', totalPoints: 1731 },
  { id: 'MCM', name: 'MCM', email: 'mcm@example.com', totalPoints: 1707 },
  { id: 'CVK', name: 'CVK', email: 'cvk@example.com', totalPoints: 1740 },
  { id: 'RMP', name: 'RMP', email: 'rmp@example.com', totalPoints: 1724 },
];

// Sample F1 drivers
export const drivers: Driver[] = [
  { id: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing' },
  { id: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing' },
  { id: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes' },
  { id: 'RUS', name: 'George Russell', team: 'Mercedes' },
  { id: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
  { id: 'SAI', name: 'Carlos Sainz', team: 'Ferrari' },
  { id: 'NOR', name: 'Lando Norris', team: 'McLaren' },
  { id: 'PIA', name: 'Oscar Piastri', team: 'McLaren' },
  { id: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin' },
  { id: 'STR', name: 'Lance Stroll', team: 'Aston Martin' },
  { id: 'OCO', name: 'Esteban Ocon', team: 'Alpine' },
  { id: 'GAS', name: 'Pierre Gasly', team: 'Alpine' },
  { id: 'TSU', name: 'Yuki Tsunoda', team: 'RB' },
  { id: 'RIC', name: 'Daniel Ricciardo', team: 'RB' },
  { id: 'HUL', name: 'Nico Hulkenberg', team: 'Haas F1 Team' },
  { id: 'MAG', name: 'Kevin Magnussen', team: 'Haas F1 Team' },
  { id: 'BOT', name: 'Valtteri Bottas', team: 'Kick Sauber' },
  { id: 'ZHO', name: 'Guanyu Zhou', team: 'Kick Sauber' },
  { id: 'ALB', name: 'Alexander Albon', team: 'Williams' },
  { id: 'SAR', name: 'Logan Sargeant', team: 'Williams' },
];

// The race results from the CSV
export const raceResults: RaceResult[] = [
  // These would be filled with actual race results
];

// Championship standings data from CSV
export const teamStandings: TeamStanding[] = [
  {
    teamId: 'ZUZ',
    totalPoints: 1863,
    averagePosition: 6.3,
    raceResults: {
      'australia': 199,
      'china': 175,
      'japan': 334,
      'bahrain': 284,
      'saudi-arabia': 278,
      'miami': 324,
      'emilia-romagna': 269
    }
  },
  {
    teamId: 'ART',
    totalPoints: 1858,
    averagePosition: 5.7,
    raceResults: {
      'australia': 219,
      'china': 195,
      'japan': 306,
      'bahrain': 243,
      'saudi-arabia': 316,
      'miami': 309,
      'emilia-romagna': 270
    }
  },
  {
    teamId: 'SSS',
    totalPoints: 1841,
    averagePosition: 8.9,
    raceResults: {
      'australia': 223,
      'china': 233,
      'japan': 281,
      'bahrain': 228,
      'saudi-arabia': 307,
      'miami': 320,
      'emilia-romagna': 249
    }
  },
  {
    teamId: 'MAD',
    totalPoints: 1831,
    averagePosition: 7.0,
    raceResults: {
      'australia': 225,
      'china': 191,
      'japan': 303,
      'bahrain': 252,
      'saudi-arabia': 299,
      'miami': 296,
      'emilia-romagna': 265
    }
  },
  {
    teamId: 'KOR',
    totalPoints: 1830,
    averagePosition: 7.1,
    raceResults: {
      'australia': 213,
      'china': 200,
      'japan': 266,
      'bahrain': 268,
      'saudi-arabia': 273,
      'miami': 323,
      'emilia-romagna': 287
    }
  },
  {
    teamId: 'MAB',
    totalPoints: 1827,
    averagePosition: 6.3,
    raceResults: {
      'australia': 240,
      'china': 170,
      'japan': 306,
      'bahrain': 270,
      'saudi-arabia': 245,
      'miami': 307,
      'emilia-romagna': 289
    }
  },
  {
    teamId: 'OSH',
    totalPoints: 1822,
    averagePosition: 7.1,
    raceResults: {
      'australia': 208,
      'china': 222,
      'japan': 261,
      'bahrain': 247,
      'saudi-arabia': 305,
      'miami': 305,
      'emilia-romagna': 274
    }
  },
  {
    teamId: 'BEE',
    totalPoints: 1812,
    averagePosition: 6.3,
    raceResults: {
      'australia': 238,
      'china': 218,
      'japan': 300,
      'bahrain': 224,
      'saudi-arabia': 252,
      'miami': 304,
      'emilia-romagna': 276
    }
  },
  {
    teamId: 'ASD',
    totalPoints: 1754,
    averagePosition: 8.0,
    raceResults: {
      'australia': 211,
      'china': 140,
      'japan': 246,
      'bahrain': 279,
      'saudi-arabia': 289,
      'miami': 325,
      'emilia-romagna': 264
    }
  },
  {
    teamId: 'RRR',
    totalPoints: 1744,
    averagePosition: 9.3,
    raceResults: {
      'australia': 214,
      'china': 187,
      'japan': 304,
      'bahrain': 232,
      'saudi-arabia': 242,
      'miami': 305,
      'emilia-romagna': 260
    }
  },
  {
    teamId: 'CVK',
    totalPoints: 1740,
    averagePosition: 10.1,
    raceResults: {
      'australia': 189,
      'china': 177,
      'japan': 287,
      'bahrain': 273,
      'saudi-arabia': 235,
      'miami': 320,
      'emilia-romagna': 259
    }
  },
  {
    teamId: 'CCV',
    totalPoints: 1731,
    averagePosition: 5.7,
    raceResults: {
      'australia': 196,
      'china': 183,
      'japan': 216,
      'bahrain': 248,
      'saudi-arabia': 302,
      'miami': 285,
      'emilia-romagna': 301
    }
  },
  {
    teamId: 'RMP',
    totalPoints: 1724,
    averagePosition: 9.3,
    raceResults: {
      'australia': 189,
      'china': 200,
      'japan': 246,
      'bahrain': 245,
      'saudi-arabia': 261,
      'miami': 309,
      'emilia-romagna': 274
    }
  },
  {
    teamId: 'MCM',
    totalPoints: 1707,
    averagePosition: 9.3,
    raceResults: {
      'australia': 202,
      'china': 155,
      'japan': 238,
      'bahrain': 251,
      'saudi-arabia': 293,
      'miami': 313,
      'emilia-romagna': 255
    }
  },
  {
    teamId: 'DRS',
    totalPoints: 1645,
    averagePosition: 11.1,
    raceResults: {
      'australia': 170,
      'china': 186,
      'japan': 276,
      'bahrain': 225,
      'saudi-arabia': 206,
      'miami': 272,
      'emilia-romagna': 310
    }
  }
];
