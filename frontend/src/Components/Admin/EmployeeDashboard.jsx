import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';


// Sidebar Navigation
function Sidebar() {
  return (
    <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
      <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsandu</Typography>
      <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee Manager</Typography>
      <Box sx={{ paddingTop: 4 }}>
        <Button
          component={Link}
          to="/EmployeeDashboard"
          startIcon={<DashboardIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start', color: '#FFF' }}
        >
          Dashboard
        </Button>
        <Button
          component={Link}
          to="/EmployeeList"
          startIcon={<PeopleIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start', color: '#FFF' }}
        >
          Employees
        </Button>
        <Button
          component={Link}
          to="/orders"
          startIcon={<ListAltIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start', color: '#FFF' }}
        >
          Orders
        </Button>
        <Button
          component={Link}
          to="/quotation"
          startIcon={<DescriptionIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start', color: '#FFF' }}
        >
          Quotation
        </Button>
        <Button
          component={Link}
          to="/supplier-quality"
          startIcon={<AssessmentIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start', color: '#FFF' }}
        >
          Supplier Quality
        </Button>
        <Button
          component={Link}
          to="/inventory-requests"
          startIcon={<InventoryIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start', color: '#FFF' }}
        >
          Inventory Requests
        </Button>
      </Box>
    </Box>
  );
}

// Summary Stats
function SummaryStats() {
  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      <Grid item xs={12} sm={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Total Employees</Typography>
          <Typography variant="h4" sx={{ color: '#FF0000' }}>141</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Project Requests</Typography>
          <Typography variant="h4" sx={{ color: '#FFAB00' }}>24</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

// Latest Quotation Table
function LatestQuotation() {
  const employees = [
    { name: 'Sithija Udayawickrama', email: 'sijja25@gmail.com', job: 'Base Worker', phone: '076-343-3355' },
    { name: 'Dihara Nanayakkara', email: 'diharan@gmail.com', job: 'Assistant Engineer', phone: '078-766-4544' },
    { name: 'Venuja Geenodh', email: 'venuajg@yahoo.com', job: 'Civil Engineer', phone: '071-334-5656' },
    { name: 'Nethum Bandara', email: 'nethumb@kaviauto.lk', job: 'Senior Engineer', phone: '077-200-5676' },
    { name: 'Sandupa Wickramasinghe', email: 'sandupa@nexconic.com', job: 'Electrical Engineer', phone: '076-768-56787' },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Latest Quotation</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.job}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>

                  <Button sx={{ backgroundColor: '#FEC304', color: 'white', marginRight: 1 }}>Details</Button>
                  <Button sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => deleteEmployee(item._id)}>Delete</Button>


                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

// Latest Orders Table
const projects = [
  { name: 'House Colombo', id: 1, status: 'Complete' },
  { name: 'Lanka Hospitals', id: 3, status: 'PENDING' },
  { name: 'Villa', id: 5, status: 'Complete' },
];

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
                <TableCell>
                                    <Button variant="contained" sx={{ backgroundColor: project.status === 'PENDING' ? '#FFAB00' : '#00C853', color: '#FFF' }}>
                                        {project.status}
                                    </Button>
                                </TableCell>                <TableCell>
                                <Button sx={{ backgroundColor: '#FEC304', color: 'white', marginRight: 1 }}>Details</Button>
                  <Button sx={{ backgroundColor: '#000', color: 'white' }}>Delete</Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>Employee Dashboard</Typography>
        <SummaryStats />
        <LatestQuotation />
        <Typography variant="h6" gutterBottom>All Projects</Typography>

        <ProjectRequests />
      </Box>
    </Box>
  );
}
