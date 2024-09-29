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

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    address: ''
  });

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPositionValid, setIsPositionValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const navigate = useNavigate();

  // Validation regex patterns
  const nameRegex = /^[A-Z][a-zA-Z\s]*$/; // Name should start with a capital letter
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  const phoneRegex = /^\+94\s[0-9]{9}$/; // Phone format: +94 followed by 9 digits
  const positionRegex = /^[a-zA-Z\s]+$/; // Position should contain only letters and spaces
  const addressRegex = /^.{5,}$/; // Address should be at least 5 characters long

  const validateNameField = () => {
    if (employee.name.trim() && nameRegex.test(employee.name)) {
      setIsNameValid(true);
      setErrors(prevErrors => ({ ...prevErrors, name: '' }));
    } else {
      setIsNameValid(false);
      setErrors(prevErrors => ({
        ...prevErrors,
        name: 'Name must start with a capital letter and can contain only letters and spaces.'
      }));
    }
  };

  const validateEmailField = () => {
    if (employee.email.trim() && emailRegex.test(employee.email)) {
      setIsEmailValid(true);
      setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    } else {
      setIsEmailValid(false);
      setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email format.' }));
    }
  };

  const validatePositionField = () => {
    if (employee.position.trim() && positionRegex.test(employee.position)) {
      setIsPositionValid(true);
      setErrors(prevErrors => ({ ...prevErrors, position: '' }));
    } else {
      setIsPositionValid(false);
      setErrors(prevErrors => ({
        ...prevErrors,
        position: 'Position should only contain letters and spaces.'
      }));
    }
  };

  const validatePhoneField = () => {
    if (employee.phone.trim() && phoneRegex.test(`+94 ${employee.phone}`)) {
      setIsPhoneValid(true);
      setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
    } else {
      setIsPhoneValid(false);
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: 'Invalid phone number format (must start with +94 and followed by 9 digits).'
      }));
    }
  };

  const validateAddressField = () => {
    if (employee.address.trim() && addressRegex.test(employee.address)) {
      setIsAddressValid(true);
      setErrors(prevErrors => ({ ...prevErrors, address: '' }));
    } else {
      setIsAddressValid(false);
      setErrors(prevErrors => ({
        ...prevErrors,
        address: 'Address must be at least 5 characters long.'
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));

    // Trigger validation based on field changes
    if (name === 'name') validateNameField();
    if (name === 'email') validateEmailField();
    if (name === 'position') validatePositionField();
    if (name === 'phone') validatePhoneField();
    if (name === 'address') validateAddressField();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are valid before submission
    if (!(isNameValid && isEmailValid && isPositionValid && isPhoneValid && isAddressValid)) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      await axios.post(URL, employee);
      alert('Employee added successfully');
      navigate('/EmployeeList');
    } catch (error) {
      setErrors({ submit: error.response ? error.response.data.message : 'An error occurred' });
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
          required
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* Render Email field only if Name is valid */}
        {isNameValid && (
          <TextField
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        )}

        {/* Render Position field only if Email is valid */}
        {isEmailValid && (
          <TextField
            label="Position"
            name="position"
            value={employee.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.position}
            helperText={errors.position}
          />
        )}

        {/* Render Phone field only if Position is valid */}
        {isPositionValid && (
          <TextField
            label="Phone"
            name="phone"
            value={`+94 ${employee.phone}`} // Add country code for display
            onChange={(e) => {
              const phoneInput = e.target.value.replace('+94 ', ''); // Remove country code from input
              setEmployee(prev => ({ ...prev, phone: phoneInput }));
              validatePhoneField();
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        )}

        {/* Render Address field only if Phone is valid */}
        {isPhoneValid && (
          <TextField
            label="Address"
            name="address"
            value={employee.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.address}
            helperText={errors.address}
          />
        )}

        {/* Render Submit button only if Address is valid */}
        {isAddressValid && (
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
        )}

        {errors.submit && (
          <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
            {errors.submit}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddEmployee;
