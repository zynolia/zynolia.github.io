import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  SelectChangeEvent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Race, User, TeamStanding } from '../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface RaceResultsProps {
  races: Race[];
  users: User[];
  standings: TeamStanding[];
}

const RaceResults: React.FC<RaceResultsProps> = ({ races, users, standings }) => {
  const completedRaces = races.filter(race => race.completed);
  
  const [selectedRace, setSelectedRace] = useState<string>(
    completedRaces.length > 0 ? completedRaces[completedRaces.length - 1].id : ''
  );

  const handleRaceChange = (event: SelectChangeEvent) => {
    setSelectedRace(event.target.value);
  };

  // Get race results for the selected race
  const selectedRaceResults = standings.map(team => ({
    teamId: team.teamId,
    points: team.raceResults[selectedRace] || 0
  })).sort((a, b) => b.points - a.points);

  // Find user data by team ID
  const getUserByTeamId = (teamId: string) => {
    return users.find(user => user.id === teamId);
  };

  // Prepare chart data for the race comparison
  const raceComparisonData = {
    labels: standings.map(team => team.teamId),
    datasets: [
      {
        label: 'Points for Selected Race',
        data: standings.map(team => team.raceResults[selectedRace] || 0),
        backgroundColor: 'rgba(225, 6, 0, 0.7)',
        borderColor: 'rgba(225, 6, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Average Points per Race',
        data: standings.map(team => {
          const completedRaceIds = Object.keys(team.raceResults);
          const totalPoints = completedRaceIds.reduce((sum, raceId) => sum + team.raceResults[raceId], 0);
          return totalPoints / completedRaceIds.length;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for team performance across races
  const teamPerformanceData = {
    labels: completedRaces.map(race => race.name),
    datasets: standings.slice(0, 5).map((team, index) => {
      // Generate a color based on index
      const colors = [
        'rgba(225, 6, 0, 1)',      // red
        'rgba(53, 162, 235, 1)',   // blue
        'rgba(75, 192, 192, 1)',   // teal
        'rgba(255, 205, 86, 1)',   // yellow
        'rgba(153, 102, 255, 1)',  // purple
      ];
      
      return {
        label: team.teamId,
        data: completedRaces.map(race => team.raceResults[race.id] || 0),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        tension: 0.1,
      };
    }),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Race Performance Comparison',
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Team Performance Across Races',
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
        Race Results
      </Typography>

      {completedRaces.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6">No races have been completed yet.</Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Race</InputLabel>
            <Select
              value={selectedRace}
              label="Select Race"
              onChange={handleRaceChange}
            >
              {completedRaces.map(race => (
                <MenuItem key={race.id} value={race.id}>{race.name} Grand Prix</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Race Results Table */}
            <Box>
              <Card sx={{ boxShadow: 3, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {completedRaces.find(race => race.id === selectedRace)?.name} Grand Prix Results
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Position</TableCell>
                          <TableCell>Team</TableCell>
                          <TableCell align="right">Points</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedRaceResults.map((result, index) => (
                          <TableRow key={result.teamId}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{result.teamId}</TableCell>
                            <TableCell align="right">{result.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Race Comparison Chart */}
            <Box>
              <Card sx={{ boxShadow: 3, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Race Performance Comparison
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ height: 300 }}>
                    <Bar options={chartOptions} data={raceComparisonData} />
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Team Performance Line Chart */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top 5 Teams Performance Across Races
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ height: 400 }}>
                    <Line options={lineChartOptions} data={teamPerformanceData} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RaceResults;
