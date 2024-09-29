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
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        quality: '',
        phone: '',
    });

    const [isNameValid, setIsNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isQualityValid, setIsQualityValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

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

    // Validation regex patterns
    const nameRegex = /^[A-Z][a-zA-Z\s]*$/; // Allow spaces in the name
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+94\s[0-9]{9}$/; // Format: +94 followed by 9 digits

    const validateNameField = () => {
        if (formData.name.trim() && nameRegex.test(formData.name)) {
            setIsNameValid(true);
            setErrors(prevErrors => ({ ...prevErrors, name: '' }));
        } else {
            setIsNameValid(false);
            setErrors(prevErrors => ({ ...prevErrors, name: 'Name must start with a capital letter and can contain only letters and spaces.' }));
        }
    };

    const validateEmailField = () => {
        if (formData.email.trim() && emailRegex.test(formData.email)) {
            setIsEmailValid(true);
            setErrors(prevErrors => ({ ...prevErrors, email: '' }));
        } else {
            setIsEmailValid(false);
            setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email format' }));
        }
    };

    const validateQualityField = () => {
        const qualityValue = parseInt(formData.quality, 10);
        if (isNaN(qualityValue) || qualityValue < 0 || qualityValue > 100) {
            setIsQualityValid(false);
            setErrors(prevErrors => ({ ...prevErrors, quality: 'Quality must be a number between 0 and 100' }));
        } else {
            setIsQualityValid(true);
            setErrors(prevErrors => ({ ...prevErrors, quality: '' }));
        }
    };

    const validatePhoneField = () => {
        if (formData.phone.trim() && phoneRegex.test(`+94 ${formData.phone}`)) {
            setIsPhoneValid(true);
            setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
        } else {
            setIsPhoneValid(false);
            setErrors(prevErrors => ({ ...prevErrors, phone: 'Invalid phone number format (must start with +94 and followed by 9 digits)' }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear error on input change

        // Trigger validation for each field as it changes
        if (name === 'name') validateNameField();
        if (name === 'email') validateEmailField();
        if (name === 'quality') validateQualityField();
        if (name === 'phone') validatePhoneField();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are valid before submission
        if (!(isNameValid && isEmailValid && isQualityValid && isPhoneValid)) {
            alert('Please fix the errors before submitting.'); // Using alert for feedback
            return;
        }

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
                    error={!!errors.name}
                    helperText={errors.name}
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
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Quality"
                    name="quality"
                    variant="outlined"
                    fullWidth
                    value={formData.quality}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.quality}
                    helperText={errors.quality}
                />
                <TextField
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone}
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
