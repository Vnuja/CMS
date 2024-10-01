import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const HomePage = () => {
    const navigate = useNavigate(); // Create navigate function

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to /login route
    };
    return (
        <>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#111', paddingY: '10px' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <img src="/path_to_logo.png" alt="Ranaweera Construction Logo" style={{ height: '50px' }} />
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About Us</Button>
                    <Button color="inherit">Service</Button>
                    <Button color="inherit">Project</Button>
                    <Button color="inherit">English</Button>
                    <Button
                        variant="contained"
                        sx={{
                            ml: 2,
                            fontWeight: 'bold',
                            padding: '8px 20px',
                            backgroundColor: '#FEC304',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#DDA304',  // Optional hover effect
                            }
                        }}
                        onClick={handleLoginClick}  // Handle the click event
                    >
                        Login
                    </Button>

                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url(https://img.freepik.com/free-photo/illustration-construction-site_23-2151850239.jpg?t=st=1727807272~exp=1727810872~hmac=60deeb799f974d19de6e1119465f598c795e07e44f4c6a92cbcbb750a3c08710&w=740)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                We Prepare For The <span style={{ color: '#FFCC00' }}>Future</span>
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Building Excellence, Crafting Dreams. Your Trusted Partner in Quality Construction.
                            </Typography>
                            <Button variant="contained" color="warning" sx={{ mr: 2 }}>
                                Our Services
                            </Button>
                            <Button variant="outlined" color="inherit">
                                Our Projects
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Quality Control Box */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 30,
                            right: 30,
                            backgroundColor: '#FFCC00',
                            color: '#000',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '300px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Typography variant="h6" gutterBottom color="black">
                            Quality Control System
                        </Typography>
                        <Typography variant="body2" color="GrayText">
                            • 100% Satisfaction Guarantee <br />
                            • Highly Professional Staff <br />
                            • Accurate Testing Processes <br />
                            • Unrivalled Workmanship, Professional and Qualified
                        </Typography>
                    </Box>
                </Container>
            </Box>


            {/* Stats Section */}
            <Box sx={{ backgroundColor: '#111', color: '#fff', py: 6 }}>
                <Container>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    25+ Years of Experience
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Years of delivering quality construction solutions.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    378+ Projects Completed
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Successfully completed numerous projects worldwide.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    69+ Winning Global Awards
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Recognized for excellence in construction and design.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
