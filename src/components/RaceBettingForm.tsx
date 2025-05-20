import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material';
import { Race, User, Driver } from '../types';
import { drivers as mockDrivers } from '../data/mockData';

interface RaceBettingFormProps {
  races: Race[];
  drivers: Driver[];
  currentUser: User;
}

const RaceBettingForm: React.FC<RaceBettingFormProps> = ({ races, drivers: propDrivers, currentUser }) => {
  // Use mock drivers if none provided through props
  const drivers = propDrivers.length > 0 ? propDrivers : mockDrivers;
  
  // Get upcoming races
  const upcomingRaces = races.filter(race => !race.completed);
  
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [predictions, setPredictions] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize predictions with empty values
  useEffect(() => {
    const initialPredictions: { [key: number]: string } = {};
    for (let i = 1; i <= 10; i++) {
      initialPredictions[i] = '';
    }
    setPredictions(initialPredictions);
  }, [selectedRace]);
  
  const handleRaceChange = (event: SelectChangeEvent) => {
    setSelectedRace(event.target.value);
    setSubmitted(false);
    setError('');
  };
  
  const handleDriverChange = (position: number) => (event: SelectChangeEvent) => {
    setPredictions(prev => ({
      ...prev,
      [position]: event.target.value
    }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check if all positions have a driver selected
    const allPositionsFilled = Object.values(predictions).every(driverId => driverId !== '');
    if (!allPositionsFilled) {
      setError('Please select a driver for all positions');
      return;
    }
    
    // Check if any driver is selected more than once
    const driverCounts = Object.values(predictions).reduce((acc: { [key: string]: number }, driverId) => {
      acc[driverId] = (acc[driverId] || 0) + 1;
      return acc;
    }, {});
    
    const duplicateDriver = Object.entries(driverCounts).find(([_, count]) => count > 1);
    if (duplicateDriver) {
      const driver = drivers.find(d => d.id === duplicateDriver[0]);
      setError(`${driver?.name || 'A driver'} is selected multiple times`);
      return;
    }
    
    // Simulate submitting the bet
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setError('');
    }, 1500);
  };
  
  if (upcomingRaces.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="info">There are no upcoming races to bet on at this time.</Alert>
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
        Place Your Race Predictions
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Box>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Predict the Top 10 Finishers
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Race</InputLabel>
                <Select
                  value={selectedRace}
                  label="Select Race"
                  onChange={handleRaceChange}
                  required
                >
                  {upcomingRaces.map(race => (
                    <MenuItem key={race.id} value={race.id}>{race.name} Grand Prix</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {selectedRace && (
                <>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(position => (
                      <Box key={position}>
                        <FormControl fullWidth>
                          <InputLabel>{`P${position}`}</InputLabel>
                          <Select
                            value={predictions[position] || ''}
                            label={`P${position}`}
                            onChange={handleDriverChange(position)}
                            required
                          >
                            {drivers.map(driver => (
                              <MenuItem key={driver.id} value={driver.id}>
                                {driver.name} ({driver.team})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    ))}
                  </Box>
                
                  {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  )}
                  
                  {submitted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Your predictions have been submitted successfully!
                    </Alert>
                  )}
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
                    <Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Prediction'}
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        Clear Selections
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr' }, gap: 3 }}>
          <Box>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Betting Rules
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText primary="Predict the exact finishing order of the top 10 drivers" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Points awarded based on accuracy of predictions" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Predictions must be submitted before race qualifying starts" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="All positions must be filled and no driver can be selected twice" />
                  </ListItem>
                </List>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Scoring System
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Exact position match" 
                      secondary="25 points"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Driver in top 10 but wrong position" 
                      secondary="10 points"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Position off by only 1 place" 
                      secondary="Extra 5 points"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RaceBettingForm;
