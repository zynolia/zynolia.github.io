import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button, 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  useMediaQuery,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './App.css';

// Import mock data
import { users, races, teamStandings, drivers } from './data/mockData';

// Import components (TypeScript resolves these without the .tsx extension)
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
      default: '#0a0a0a',
      paper: '#1e1e1e',
    },
    error: {
      main: '#e10600',
    },
    success: {
      main: '#00a020',
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
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #e10600 0%, #720300 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-2px)'
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#c80500',
          }
        }
      },
    },
  },
});

// Navigation item type definition
interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

// Main navigation component
const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems: NavItem[] = [
    { text: 'Dashboard', path: '/', icon: <HomeIcon /> },
    { text: 'Standings', path: '/standings', icon: <EmojiEventsIcon /> },
    { text: 'Place Bet', path: '/bet', icon: <SportsSoccerIcon /> },
    { text: 'Results', path: '/results', icon: <AssessmentIcon /> },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>F1 BETTING LEAGUE</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Box 
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setDrawerOpen(false)}
            sx={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <ListItem 
              sx={{
                borderLeft: location.pathname === item.path ? '4px solid #e10600' : '4px solid transparent',
                bgcolor: location.pathname === item.path ? 'rgba(225, 6, 0, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(225, 6, 0, 0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              letterSpacing: '0.5px'
            }}
          >
            F1 BETTING LEAGUE
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.text} 
                  component={Link} 
                  to={item.path} 
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    borderBottom: location.pathname === item.path ? '3px solid white' : '3px solid transparent',
                    borderRadius: 0,
                    py: 2
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ ml: 2 }}>
            <IconButton
              onClick={handleProfileMenuOpen}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#fff', color: '#e10600' }}>
                {users[0].name.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem 
              component={Link} 
              to="/profile" 
              onClick={handleProfileMenuClose}
            >
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

function App() {
  // Simple auth state for demo purposes
  const [currentUser, setCurrentUser] = useState(users[0]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/f1-bet">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #121212 100%)',
          // Use a solid background color since we don't have a custom background image yet
          // backgroundImage: `url(${process.env.PUBLIC_URL}/images/f1-track-bg.png)`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}>
          <Navigation />
          
          <Container maxWidth="lg" sx={{ 
            mt: { xs: 2, md: 4 }, 
            mb: { xs: 2, md: 4 },
            p: { xs: 2, md: 3 },
            flexGrow: 1,
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <Routes>
              <Route path="/" element={<Dashboard users={users} races={races} standings={teamStandings} />} />
              <Route path="/standings" element={<Standings standings={teamStandings} />} />
              <Route path="/bet" element={<RaceBettingForm races={races} drivers={drivers} currentUser={currentUser} />} />
              <Route path="/results" element={<RaceResults races={races} users={users} standings={teamStandings} />} />
              <Route path="/profile" element={<UserProfile user={currentUser} />} />
              <Route path="*" element={
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h4" gutterBottom>Page Not Found</Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    The page you're looking for doesn't exist or has been moved.
                  </Typography>
                  <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
                    Back to Dashboard
                  </Button>
                </Box>
              } />
            </Routes>
          </Container>

          <Box component="footer" sx={{ 
            bgcolor: 'rgba(18, 18, 18, 0.9)', 
            py: 3, 
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: { xs: 2, md: 0 } }}>
                  F1 Betting League © {new Date().getFullYear()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Typography variant="body2" color="text.secondary" component={Link} to="/" sx={{ textDecoration: 'none' }}>
                    Home
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component={Link} to="/bet" sx={{ textDecoration: 'none' }}>
                    Place Bet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component={Link} to="/profile" sx={{ textDecoration: 'none' }}>
                    Profile
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
