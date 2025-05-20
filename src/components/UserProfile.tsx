import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip
} from '@mui/material';
import { User } from '../types';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

interface UserProfileProps {
  user: User;
}

// Placeholder for a predictions table - in a real app this would show actual predictions
const TablePlaceholder = () => (
  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
    <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center' }}>
      Recent predictions would be displayed here. 
      This would include race name, prediction date, drivers predicted, 
      and points earned for each prediction.
    </Typography>
  </Box>
);

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
        Team Profile
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        <Box>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  bgcolor: 'primary.main', 
                  fontSize: '2.5rem',
                  mb: 2
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Chip 
                  label={`Total Points: ${user.totalPoints}`} 
                  color="primary" 
                  sx={{ fontWeight: 'bold' }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Box>
          <Card sx={{ boxShadow: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Statistics
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <EmojiEventsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Best Race Performance" 
                    secondary="Japan Grand Prix - 334 points" 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AssessmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Average Points Per Race" 
                    secondary={`${Math.round(user.totalPoints / 7)} points`} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <SportsScoreIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Prediction Accuracy" 
                    secondary="68% of predictions in top 10" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Predictions History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TablePlaceholder />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserProfile;
