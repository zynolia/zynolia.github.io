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
  Tabs,
  Tab,
  Avatar,
  Chip
} from '@mui/material';
import { TeamStanding } from '../types';

interface StandingsProps {
  standings: TeamStanding[];
}

const Standings: React.FC<StandingsProps> = ({ standings }) => {
  const [tabValue, setTabValue] = useState(0);
  
  // Sort standings by total points (descending)
  const sortedStandings = [...standings].sort((a, b) => b.totalPoints - a.totalPoints);
  
  // Get unique race IDs from the first team's results (assuming all teams have same races)
  const raceIds = Object.keys(sortedStandings[0]?.raceResults || {});
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
        Championship Standings
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="standings tabs"
        >
          <Tab label="Overall" />
          {raceIds.map(raceId => (
            <Tab key={raceId} label={raceId.charAt(0).toUpperCase() + raceId.slice(1).replace('-', ' ')} />
          ))}
        </Tabs>
      </Box>
      
      {tabValue === 0 ? (
        // Overall standings table
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper' }}>
                <TableCell>Position</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Total Points</TableCell>
                <TableCell align="right">Avg. Position</TableCell>
                <TableCell align="right">Gap to Leader</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStandings.map((standing, index) => {
                const pointsGap = index === 0 ? 0 : sortedStandings[0].totalPoints - standing.totalPoints;
                return (
                  <TableRow 
                    key={standing.teamId}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: index < 3 ? `rgba(225, 6, 0, ${0.1 * (3 - index)})` : 'inherit',
                    }}
                  >
                    <TableCell>
                      <Chip 
                        label={index + 1} 
                        size="small" 
                        sx={{ 
                          bgcolor: index === 0 ? '#e10600' : index === 1 ? '#1E88E5' : index === 2 ? '#43A047' : 'grey.500',
                          color: 'white',
                          fontWeight: 'bold',
                          minWidth: '30px'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 30, height: 30, mr: 1, bgcolor: index === 0 ? '#e10600' : 'primary.main' }}>
                          {standing.teamId.charAt(0)}
                        </Avatar>
                        {standing.teamId}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{standing.totalPoints}</TableCell>
                    <TableCell align="right">{standing.averagePosition.toFixed(1)}</TableCell>
                    <TableCell align="right">
                      {index === 0 ? (
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>Leader</Typography>
                      ) : (
                        `-${pointsGap}`
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Individual race standings
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper' }}>
                <TableCell>Position</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Race Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStandings
                .map(standing => ({
                  teamId: standing.teamId,
                  racePoints: standing.raceResults[raceIds[tabValue - 1]] || 0
                }))
                .sort((a, b) => b.racePoints - a.racePoints)
                .map((item, index) => (
                  <TableRow 
                    key={item.teamId}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: index < 3 ? `rgba(225, 6, 0, ${0.1 * (3 - index)})` : 'inherit',
                    }}
                  >
                    <TableCell>
                      <Chip 
                        label={index + 1} 
                        size="small" 
                        sx={{ 
                          bgcolor: index === 0 ? '#e10600' : index === 1 ? '#1E88E5' : index === 2 ? '#43A047' : 'grey.500',
                          color: 'white',
                          fontWeight: 'bold',
                          minWidth: '30px'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 30, height: 30, mr: 1, bgcolor: index === 0 ? '#e10600' : 'primary.main' }}>
                          {item.teamId.charAt(0)}
                        </Avatar>
                        {item.teamId}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{item.racePoints}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Standings;
