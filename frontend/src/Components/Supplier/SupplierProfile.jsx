import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';

const URL = "http://localhost:4001/suppliers";

function Sidebar() {
  return (
    <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
      <Typography variant="h6" sx={{ paddingLeft: 2 }}>Supplier Management</Typography>
      <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Supplier Profile</Typography>
      <Box sx={{ paddingTop: 4 }}>
        <Button component={Link} to="/SupplierDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
          Dashboard
        </Button>
        <Button component={Link} to="/suppliers" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', backgroundColor: '#FBBF24', color: '#FFF' }}>
          Suppliers
        </Button>
        <Button component={Link} to="/orders" startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
          Orders
        </Button>
        <Button component={Link} to="/quotation" startIcon={<DescriptionIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
          Quotation
        </Button>
        <Button component={Link} to="/inventory-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
          Inventory Requests
        </Button>
      </Box>
    </Box>
  );
}

function SupplierProfile() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    quality: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setSupplier(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supplier:", error);
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/${id}`, supplier);
      alert('Supplier updated successfully');
      navigate('/suppliers');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Update Supplier</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            name="email"
            value={supplier.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone"
            value={supplier.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quality"
            name="quality"
            value={supplier.quality}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2, backgroundColor: '#FBBF24' }} // Similar color to sidebar button
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

export default function SupplierManagement() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar takes a fixed width */}
      <Sidebar />

      {/* Main content fills the remaining space */}
      <Box sx={{ flexGrow: 1 }}>
        <SupplierProfile />
      </Box>
    </Box>
  );
}
