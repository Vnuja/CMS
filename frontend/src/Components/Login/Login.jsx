import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Username can only contain letters")
            .required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:4001/auth/login", values);
                if (response.status === 200) {
                    const { token, user: loggedInUser } = response.data;
                    login(token, loggedInUser);

                    if (loggedInUser.type === "supplier") {
                        alert("Supplier Manager Login Successful");
                        navigate("/SupplierDashboard");
                    } else if (loggedInUser.type === "employee") {
                        alert("Employee Manager Login Successful");
                        navigate("/EmployeeDashboard");
                    } else {
                        alert("Admin Login Successful");
                        navigate("/admindashboard");
                    }
                } else {
                    alert("Login Error: " + response.data.message);
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    alert("User not found");
                } else if (err.response && err.response.status === 400) {
                    alert("Invalid credentials");
                } else {
                    alert("Error: " + err.message);
                }
            }
        },
    });

    return (
        <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 5 }}>
                <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, maxWidth: 1000 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} sx={{ backgroundColor: '#2C2C2C', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
                                "Secure Access to Excellence – Manage, Monitor, and Build with Confidence."
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                Log to Dashboard
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: 2, color: '#777' }}>
                                Admin Portal! <ConstructionIcon />
                            </Typography>
                            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="User Name"
                                    variant="outlined"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    InputProps={{
                                        startAdornment: <PersonIcon sx={{ color: '#FFC300' }} />,
                                        sx: { backgroundColor: '#F0F0F0', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    InputProps={{
                                        startAdornment: <LockIcon sx={{ color: '#FFC300' }} />,
                                        sx: { backgroundColor: '#F0F0F0', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 3 }}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: '#333', color: '#FFFFFF', paddingY: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                                >
                                    Login Now
                                </Button>
                                <Typography variant="body2" sx={{ color: '#333', marginTop: 2 }}>
                                    Forget Password? <a href="#" style={{ color: '#FFC300' }}>Click here</a>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;
