import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

const projects = [
  { name: 'House Colombo', id: 1, status: 'Complete' },
  { name: 'Lanka Hospitals', id: 3, status: 'Pending' },
  { name: 'Villa', id: 5, status: 'Complete' },
];


function Sidebar() {
  return (
      <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsandu</Typography>
          <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee Manager</Typography>
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
              <Button component={Link} to="/project-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                  Project Requests
              </Button>
          </Box>
      </Box>
  );
}

const ProjectRequests = () => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Project ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" sx={{ marginRight: '10px' }}>
                    Assign
                  </Button>
                  <Button variant="contained" color="error">
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectRequests;
