/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/suppliers";

function UpdateSupplier() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        quality: '',
        phone: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error("Error fetching supplier:", error.response ? error.response.data : error.message);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/${id}`, formData);
            navigate('/admindashboard');
        } catch (error) {
            console.error("Error updating supplier:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Update Supplier</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Quality"
                    name="quality"
                    variant="outlined"
                    fullWidth
                    value={formData.quality}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Update Supplier
                </Button>
            </form>
        </Box>
    );
}

export default UpdateSupplier;
