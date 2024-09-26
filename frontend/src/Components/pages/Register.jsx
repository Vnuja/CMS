/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider, Checkbox, FormControlLabel } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Logo from '../Images/3.png';

const URL = "http://localhost:4001/users";

function AddUser({ onBack }) {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('user'); // Default to 'user'
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post(URL, { userName, name, email, password, phone, type });
      if (response.status === 201) {
        // Notify user of successful addition
        alert('User added successfully');
        // Redirect to the UserDetails page
        navigate('/login');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#000000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 5 }}>
        <Paper elevation={6} sx={{ paddingRight: 4, paddingLeft: 4, paddingTop: 4, borderRadius: 2, maxWidth: 900, backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C2C2C', borderRadius: 2 }}>
              <img src={Logo} alt="Sky Light Cinema" style={{ maxWidth: '100%', paddingRight: 30, height: '50vh', paddingBottom: 30 }} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#FF0000' }}>
                REGISTER
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Username"
                  variant="outlined"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ color: '#FF0000' }} />,
                    sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Name"
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ color: '#FF0000' }} />,
                    sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ color: '#FF0000' }} />,
                    sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ color: '#FF0000' }} />,
                    sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Phone"
                  variant="outlined"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ color: '#FF0000' }} />,
                    sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      sx={{ color: '#FFFFFF' }}
                    />
                  }
                  label="Accept Terms and Conditions"
                  sx={{ marginBottom: 2, color: '#FFFFFF' }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    paddingY: 1.5,
                    borderRadius: 2,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Create Account
                </Button>
                <Divider sx={{ marginY: 2, borderColor: '#FFFFFF' }}>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Or sign up with</Typography>
                </Divider>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ marginTop: 2 }}
                  onClick={onBack}
                >
                  Back
                </Button>
                {error && (
                  <Typography color="error" sx={{ marginTop: 2 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default AddUser;
