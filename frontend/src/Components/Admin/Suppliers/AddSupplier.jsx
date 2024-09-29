/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/suppliers";

function AddSupplier({ onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        quality: '',
        phone: ''
    });
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData); // Log form data for debugging
            const response = await axios.post(URL, formData);
            console.log('Response from server:', response.data); // Log server response
            setSnackbarMessage('Supplier added successfully');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            navigate('/suppliers');

        } catch (error) {
            console.error("Error adding supplier:", error.response ? error.response.data : error.message);
            setSnackbarMessage('Error adding supplier: ' + (error.response ? error.response.data.message : error.message));
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };
    
    

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Add Supplier</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Quality"
                    name="quality"
                    variant="outlined"
                    fullWidth
                    value={formData.quality}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Add Supplier
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onBack}
                    sx={{ marginTop: 2, marginLeft: 2 }}
                >
                    Back
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AddSupplier;
