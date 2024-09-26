/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'; // Import Footer component
import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider, Checkbox, FormControlLabel } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Logo from '../Images/3.png';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: "", // Added userName
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("Please accept the terms and conditions.");
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            userName: user.userName, // Ensure userName is included
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password
        };

        try {
            const response = await axios.post("http://localhost:4001/users/register", userData);
            if (response.data.message === "User created successfully") {
                alert("Registration successful");
                navigate('/login');
            } else {
                alert("Registration failed");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#FAF2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 5 }}>
                <Paper elevation={6} sx={{ paddingRight: 4, paddingLeft: 4, paddingTop: 4, borderRadius: 2, maxWidth: 900 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8D9D9', borderRadius: 2 }}>
                            <img src={Logo} alt="Crystal Elegance" style={{ maxWidth: '100%', paddingRight: 30, height: '50vh', paddingBottom: 30 }} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                REGISTER
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Username" // Changed placeholder
                                    variant="outlined"
                                    name="userName" // Changed name attribute
                                    value={user.userName}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <PersonIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Name"
                                    variant="outlined"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <PersonIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Email"
                                    variant="outlined"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <EmailIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Phone"
                                    variant="outlined"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <PhoneIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <LockIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <LockIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                        />
                                    }
                                    label="Accept Terms and Conditions"
                                    sx={{ marginBottom: 2 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#F8B9B7',
                                        color: '#fff',
                                        paddingY: 1.5,
                                        borderRadius: 2,
                                        boxShadow: 'none',
                                        textTransform: 'none',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Create Account
                                </Button>
                                <Divider sx={{ marginY: 2 }}>
                                    <Typography variant="body2">Or sign up with</Typography>
                                </Divider>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default Register;
