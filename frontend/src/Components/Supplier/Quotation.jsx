import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Make sure to import Link
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';

const Quotations = () => {
  // Sample data
  const rows = [
    { quotationNo: '01', inventoryReqNo: '01', supplier: 'Sanjaya Dayarathna', amount: 'Rs.15,000,000.00', status: 'PENDING' },
    { quotationNo: '02', inventoryReqNo: '02', supplier: 'Kavindu Nanayakkara', amount: 'Rs.33,000,000.00', status: 'APPROVED' },
    { quotationNo: '03', inventoryReqNo: '03', supplier: 'Kavindu Nanayakkara', amount: 'Rs.42,000,000.00', status: 'PENDING' },
    { quotationNo: '04', inventoryReqNo: '03', supplier: 'Nimeshka Hewage', amount: 'Rs.61,000,000.00', status: 'APPROVED' }
  ];

  const renderStatusChip = (status) => {
    if (status === 'PENDING') {
      return <Chip label="PENDING" color="warning" />;
    } else if (status === 'APPROVED') {
      return <Chip label="APPROVED" color="success" />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
        <Typography variant="h6" sx={{ paddingLeft: 2 }}>Budwin Mendis</Typography>
        <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Supplier Manager</Typography>
        <Box sx={{ paddingTop: 4 }}>
          <Button
            component={Link}
            to="/SupplierDashboard"
            startIcon={<DashboardIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/suppliers"
            startIcon={<PeopleIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Suppliers
          </Button>
          <Button
            component={Link}
            to="/orders"
            startIcon={<ListAltIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Orders
          </Button>
          <Button
            component={Link}
            to="/quotation"
            startIcon={<DescriptionIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Quotation
          </Button>
          <Button
            component={Link}
            to="/supplier-quality"
            startIcon={<AssessmentIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Supplier Quality
          </Button>
          <Button
            component={Link}
            to="/inventory-requests"
            startIcon={<InventoryIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Inventory Requests
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <TableContainer component={Paper} sx={{ marginLeft: 2, marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="quotations table">
          <TableHead>
            <TableRow>
              <TableCell>QUOTATION NO</TableCell>
              <TableCell>INVENTORY REQ NO</TableCell>
              <TableCell>SUPPLIER</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.quotationNo}>
                <TableCell>{row.quotationNo}</TableCell>
                <TableCell>{row.inventoryReqNo}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{renderStatusChip(row.status)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small">Details</Button>&nbsp;
                  {row.status === 'PENDING' ? (
                    <Button variant="contained" color="success" size="small">Approve</Button>
                  ) : (
                    <Button variant="contained" color="success" size="small" disabled>Approve</Button>
                  )}
                  &nbsp;
                  <Button variant="contained" color="error" size="small">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Quotations;
