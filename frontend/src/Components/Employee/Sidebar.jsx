import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box sx={{ width: '240px', bgcolor: '#333', height: '100vh', color: '#fff' }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/employees">
          <ListItemIcon><PeopleIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <Divider sx={{ backgroundColor: '#555' }} />
        {/* More links */}
        <ListItem button component={Link} to="/projects">
          <ListItemIcon><AssignmentIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Project Requests" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
