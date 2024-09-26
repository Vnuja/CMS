/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees";

function AddEmployee({ onBack }) {
  const [employee, setEmployee] = useState({
    EMPID: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      await axios.post(URL, employee);
      alert('Employee added successfully');
      navigate('/admindashboard/employee-management');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={employee.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Employee
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={onBack}
        >
          Back
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddEmployee;
