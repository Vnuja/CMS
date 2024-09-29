import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';

const Sidebar = () => (
  <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
    <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsadu</Typography>
    <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee management</Typography>
    <Box sx={{ paddingTop: 4 }}>
      <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Dashboard
      </Button>
      <Button component={Link} to="/EmployeeList" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Employees
      </Button>
      <Button component={Link} to="/attendance" startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Attendance
      </Button>
      <Button component={Link} to="/payroll" startIcon={<DescriptionIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Payroll
      </Button>
      <Button component={Link} to="/project-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF', backgroundColor: '#FBBF24' }}>
        Project Requests
      </Button>
    </Box>
  </Box>
);

const ProjectRequests = () => {
  const [projects] = useState([
    { id: 1, name: "House Colombo", status: "COMPLETE" },
    { id: 3, name: "Lanka Hospitals", status: "PENDING" },
    { id: 5, name: "Villa", status: "COMPLETE" },
  ]);

  const handleAssign = (projectId) => {
    alert(`Assigning project ID: ${projectId}`);
  };

  const handleDecline = (projectId) => {
    alert(`Declining project ID: ${projectId}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: '#F9FAFB' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Project Requests</Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 3 }}>
          <TextField 
            label="Search Employees" 
            variant="outlined" 
            size="small"
            sx={{ backgroundColor: 'white', width: 300 }}
          />
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle1">Project Name</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Project ID</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Status</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      display: 'inline-block', 
                      padding: '4px 12px', 
                      borderRadius: '16px', 
                      color: '#FFF',
                      backgroundColor: project.status === 'COMPLETE' ? '#FBBF24' : '#34D399'
                    }}>
                      {project.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      onClick={() => handleAssign(project.id)} 
                      sx={{ backgroundColor: '#FBBF24', marginRight: 2 }}>
                      Assign
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={() => handleDecline(project.id)} 
                      sx={{ backgroundColor: '#1C1C1C', color: '#FFF' }}>
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProjectRequests;
