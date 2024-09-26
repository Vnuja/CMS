import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees";

function UpdateEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    EMPID: '',
    name: '',
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
      navigate('/admindashboard/employee-management');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update Employee</Typography>
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
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update Employee
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default UpdateEmployee;
