/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Slider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/suppliers";

function AddSupplier({ onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        quality: 0, // Initialize quality as a number
        phone: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        quality: '',
        phone: '',
    });

    // State for each field validation
    const [isNameValid, setIsNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isQualityValid, setIsQualityValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const navigate = useNavigate();

    // Validation regex patterns
    const nameRegex = /^[A-Z][a-zA-Z\s]*$/; // Allow spaces in the name
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+94\s[0-9]{9}$/; // Format: +94 followed by 9 digits

    // Handle individual field validations
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
        const qualityValue = formData.quality; // Directly use the number
        if (qualityValue < 0 || qualityValue > 100) {
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
        if (name === 'phone') validatePhoneField();
    };

    const handleSliderChange = (event, newValue) => {
        setFormData(prev => ({ ...prev, quality: newValue })); // Update quality in formData
        validateQualityField(); // Validate quality whenever slider changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are valid before submission
        if (!(isNameValid && isEmailValid && isQualityValid && isPhoneValid)) {
            alert('Please fix the errors before submitting.'); // Using alert for feedback
            return;
        }

        try {
            await axios.post(URL, formData);
            alert('Supplier added successfully'); // Using alert for feedback
            navigate('/suppliers');
        } catch (error) {
            alert('Error adding supplier: ' + (error.response ? error.response.data.message : error.message)); // Using alert for feedback
        }
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
                    error={!!errors.name}
                    helperText={errors.name}
                />

                {/* Render Email field only if Name is valid */}
                {isNameValid && (
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                )}

                {/* Render Quality Slider only if Email is valid */}
                {isEmailValid && (
                    <Box sx={{ margin: '20px 0' }}>
                        <Typography gutterBottom>Quality (0-100)</Typography>
                        <Slider
                            value={formData.quality}
                            onChange={handleSliderChange}
                            aria-labelledby="quality-slider"
                            valueLabelDisplay="on"
                            min={0}
                            max={100}
                            sx={{
                                color: 'yellow', // Yellow accent
                                '& .MuiSlider-thumb': {
                                    backgroundColor: 'white', // Thumb color
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: 'yellow', // Track color
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#ccc', // Rail color
                                },
                            }}
                        />
                        {errors.quality && (
                            <Typography color="error">{errors.quality}</Typography>
                        )}
                    </Box>
                )}

                {/* Render Phone field only if Quality is valid */}
                {isQualityValid && (
                    <TextField
                        label="Phone"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        value={`+94 ${formData.phone}`} // Include the country code in the display
                        onChange={(e) => {
                            const phoneInput = e.target.value.replace('+94 ', ''); // Remove the country code from the input
                            setFormData(prev => ({ ...prev, phone: phoneInput }));
                            validatePhoneField(); // Validate after change
                        }}
                        margin="normal"
                        required
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                )}

                {/* Render Submit button only if Phone is valid */}
                {isPhoneValid && (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Add Supplier
                    </Button>
                )}

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onBack}
                    sx={{ marginTop: 2, marginLeft: 2 }}
                >
                    Back
                </Button>
            </form>
        </Box>
    );
}

export default AddSupplier;
