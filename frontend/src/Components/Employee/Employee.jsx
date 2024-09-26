import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

const employees = [
  { name: 'Sithija Udayawickrama', email: 'sijja25@gmail.com', job: 'Base Worker', phone: '076-343-3355' },
  { name: 'Dihara Nanayakkara', email: 'diharan@gmail.com', job: 'Assistant Engineer', phone: '078-766-4544' },
  { name: 'Venuja Geenodh', email: 'venuajg@yahoo.com', job: 'Civil Engineer', phone: '071-334-5656' },
  { name: 'Nethum Bandara', email: 'nethumb@kaviauto.lk', job: 'Senior Engineer', phone: '077-200-5676' },
  { name: 'Sandupa Wickramasinghe', email: 'sandupa@nexconic.com', job: 'Electrical Engineer', phone: '076-768-56787' },
];

const Employees = () => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.job}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" sx={{ marginRight: '10px' }}>
                    Details
                  </Button>
                  <Button variant="contained" color="error">
                    Delete
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

export default Employees;
