import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './App.css';

// Import mock data
import { users, races, teamStandings } from './data/mockData';

// Pages
import Dashboard from './components/Dashboard';
import Standings from './components/Standings';
import RaceBettingForm from './components/RaceBettingForm';
import RaceResults from './components/RaceResults';
import UserProfile from './components/UserProfile';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e10600', // F1 red
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Titillium Web", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
});

function App() {
  // Simple auth state for demo purposes
  const [currentUser, setCurrentUser] = useState(users[0]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
              F1 Betting League
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button component={Link} to="/" color="inherit">Dashboard</Button>
              <Button component={Link} to="/standings" color="inherit">Standings</Button>
              <Button component={Link} to="/bet" color="inherit">Place Bet</Button>
              <Button component={Link} to="/results" color="inherit">Results</Button>
              <Button component={Link} to="/profile" color="inherit">{currentUser.name}</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard users={users} races={races} standings={teamStandings} />} />
            <Route path="/standings" element={<Standings standings={teamStandings} />} />
            <Route path="/bet" element={<RaceBettingForm races={races} drivers={[]} currentUser={currentUser} />} />
            <Route path="/results" element={<RaceResults races={races} users={users} standings={teamStandings} />} />
            <Route path="/profile" element={<UserProfile user={currentUser} />} />
          </Routes>
        </Container>

        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2, mt: 'auto' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              F1 Betting League © {new Date().getFullYear()}
            </Typography>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
