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


  const fetchEmployees = async () => {
    try {
      const response = await axios.get(URL);
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      await axios.post(URL, employee);
      alert('Employee added successfully');
      navigate('/EmployeeList');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
        width: '60%',
        margin: 'auto',
        marginTop: 5,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
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
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Address"
          name="address"
          value={employee.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: 'yellow', color: 'black', marginRight: 2 }}
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'black', color: 'white' }}
            onClick={onBack}
          >
            Back
          </Button>
        </Box>
        {error && (
          <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddEmployee;
