import React, { useState } from 'react';
import { Search } from '@mui/icons-material';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Avatar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';


function Sidebar() {
    return (
        <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
            <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsandu</Typography>
            <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee Manager</Typography>
            <Box sx={{ paddingTop: 4 }}>
                <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Dashboard
                </Button>
                <Button component={Link} to="/EmployeeList" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start',backgroundColor: '#FBBF24', color: '#FFF' }}>
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

// Dummy Data for Leave Requests
const leaveRequestsData = [
  { name: 'Sithija Udayawickrama', email: 'sijija25@gmail.com', leaveDate: '25/08/2024' },
  { name: 'Sandupa Wickramasinghe', email: 'sandupa@nexconic.com', leaveDate: '10/09/2024' },
];

const LeaveRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter employees based on search query
  const filteredLeaveRequests = leaveRequestsData.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Leave Requests
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Employees"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      {/* Leave Requests Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Leave Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaveRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }} />
                    {request.name}
                  </Box>
                </TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.leaveDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#FBBF24', // Yellow for Approve button
                      color: '#000',
                      marginRight: 1,
                      '&:hover': {
                        backgroundColor: '#EAB308', // Darker Yellow on hover
                      }
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#000', // Black for Decline button
                      color: '#FFF',
                      '&:hover': {
                        backgroundColor: '#333', // Darker black on hover
                      }
                    }}
                  >
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

// Main Export Component
export default function LeaveRequestsPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar for navigation */}
      <Sidebar />
      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <LeaveRequests />
      </Box>
    </Box>
  );
}
