import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

const projects = [
  { name: 'House Colombo', id: 1, status: 'Complete' },
  { name: 'Lanka Hospitals', id: 3, status: 'Pending' },
  { name: 'Villa', id: 5, status: 'Complete' },
];

const ProjectRequests = () => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Project ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" sx={{ marginRight: '10px' }}>
                    Assign
                  </Button>
                  <Button variant="contained" color="error">
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectRequests;
