import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { Race, TeamStanding, User, RaceResult } from '../types';

interface DashboardProps {
  users: User[];
  races: Race[];
  standings: TeamStanding[];
}

const Dashboard: React.FC<DashboardProps> = ({ users, races, standings }) => {
  // Get next upcoming race
  const nextRace = races.find(race => !race.completed);
  
  // Sort standings by total points (descending)
  const sortedStandings = [...standings].sort((a, b) => b.totalPoints - a.totalPoints);
  const topStandings = sortedStandings.slice(0, 5);
  
  // Get races that have results
  const completedRaces = races.filter(race => race.completed);
  const latestRace = completedRaces.length > 0 ? completedRaces[completedRaces.length - 1] : null;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        F1 Betting League Dashboard
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Next Race Card */}
        <Box>
          <Card sx={{ height: '100%', boxShadow: 3, background: 'linear-gradient(45deg, #3a0404 0%, #e10600 100%)' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'white' }}>
                Next Race
              </Typography>
              {nextRace ? (
                <>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                    {nextRace.name} Grand Prix
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white' }}>
                    Race Date: {new Date(nextRace.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', mt: 2 }}>
                    Place your predictions before the race starts!
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" sx={{ color: 'white' }}>
                  No upcoming races scheduled
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Latest Results Card */}
        <Box>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Latest Race Results
              </Typography>
              {latestRace ? (
                <>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {latestRace.name} Grand Prix
                  </Typography>
                  {latestRace.results && latestRace.results.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell align="right">Points</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {latestRace.results.slice(0, 5).map((result: RaceResult, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{result.driverName}</TableCell>
                              <TableCell align="right">{result.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body1">No results available</Typography>
                  )}
                </>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                  <Box>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                        <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: '#e10600' }}>
                          {users[0]?.name.charAt(0) || 'U'}
                        </Avatar>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {users[0]?.name || 'User'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Points: {users[0]?.totalPoints || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rank: #{users[0]?.rank || 'N/A'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Recent Activity
                        </Typography>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Race</TableCell>
                                <TableCell>Prediction</TableCell>
                                <TableCell align="right">Points</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {users[0]?.recentPredictions?.map((prediction, index) => (
                                <TableRow key={index}>
                                  <TableCell>{prediction.raceName}</TableCell>
                                  <TableCell>{prediction.prediction}</TableCell>
                                  <TableCell align="right">{prediction.points}</TableCell>
                                </TableRow>
                              )) || (
                                <TableRow>
                                  <TableCell colSpan={3} align="center">
                                    No recent activity
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Top Teams Card */}
      <Box sx={{ mt: 3 }}>
        <Card sx={{ height: '100%', boxShadow: 3 }}>
          <CardHeader title="Championship Standings" />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Avg. Position</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topStandings.map((standing, index) => (
                    <TableRow key={standing.teamId} sx={{ bgcolor: index === 0 ? 'rgba(225, 6, 0, 0.1)' : 'inherit' }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 30, height: 30, mr: 1, bgcolor: index === 0 ? '#e10600' : 'primary.main' }}>
                            {standing.teamId.charAt(0)}
                          </Avatar>
                          {standing.teamId}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{standing.totalPoints}</TableCell>
                      <TableCell align="right">{standing.averagePosition.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
