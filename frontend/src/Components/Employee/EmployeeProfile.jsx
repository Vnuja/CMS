import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';

const URL = "http://localhost:4001/employees";

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

function UpdateEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',      // Update this to match your actual state field
    email: '',
    position: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/${id}`, employee);
      alert('Employee updated successfully');
      navigate('/EmployeeList');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Update Employee</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"  // Ensure the 'name' field matches the state key
            value={employee.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            name="email"  // Ensure this matches 'email' in the state
            value={employee.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone"  // Ensure this matches 'phone' in the state
            value={employee.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Role"
            name="position"  // Ensure this matches 'position' in the state
            value={employee.position}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            name="address"  // Ensure this matches 'address' in the state
            value={employee.address}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2, backgroundColor: '#FBBF24' }} // Yellow color similar to the button in the image
      >
        Save Details
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default function EmployeeManagement() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar takes a fixed width */}
      <Sidebar />

      {/* Main content fills the remaining space */}
      <Box sx={{ flexGrow: 1 }}>
        <UpdateEmployee />
      </Box>
    </Box>
  );
}
