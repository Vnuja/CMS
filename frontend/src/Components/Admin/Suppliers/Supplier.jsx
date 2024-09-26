/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';

const URL = "http://localhost:4001/suppliers";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(URL);
        // Assuming the supplier data structure is updated accordingly
        setSuppliers(response.data); // No date conversion needed as there’s no date field
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (suppliers.length === 0) return <Typography>No suppliers found.</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Supplier Details
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {suppliers.map((supplier) => (
        <Paper key={supplier.phone} sx={{ padding: 3, marginBottom: 2 }}> {/* Assuming phone is unique */}
          <Typography variant="h6">Name: {supplier.name}</Typography>
          <Typography variant="h6">Email: {supplier.email}</Typography>
          <Typography variant="h6">Quality: {supplier.quality}</Typography>
          <Typography variant="h6">Phone: {supplier.phone}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default Supplier;
