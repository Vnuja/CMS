import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: '#f44336', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5">Total Employees</Typography>
              <Typography variant="h2">141</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: '#ffeb3b', color: '#000' }}>
            <CardContent>
              <Typography variant="h5">Projects Requests</Typography>
              <Typography variant="h2">14</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
