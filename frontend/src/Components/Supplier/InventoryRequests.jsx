import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';

const InventoryRequests = () => {
  // Sample data for the table
  const rows = [
    { inventoryReqNo: '01', status: 'QUOTATION PENDING' },
    { inventoryReqNo: '02', status: 'QUOTATION REQUESTED' }
  ];

  const renderStatusChip = (status) => {
    if (status === 'QUOTATION PENDING') {
      return <Chip label="QUOTATION PENDING" color="warning" />;
    } else if (status === 'QUOTATION REQUESTED') {
      return <Chip label="QUOTATION REQUESTED" color="success" />;
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
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="inventory requests table">
            <TableHead>
              <TableRow>
                <TableCell>INVENTORY REQ NO</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.inventoryReqNo}>
                  <TableCell>{row.inventoryReqNo}</TableCell>
                  <TableCell>{renderStatusChip(row.status)}</TableCell>
                  <TableCell>
                    {row.status === 'QUOTATION PENDING' ? (
                      <Button variant="contained" color="primary" size="small">Request</Button>
                    ) : (
                      <Button variant="contained" color="primary" size="small" disabled>Request</Button>
                    )}
                    &nbsp;
                    <Button variant="contained" color="warning" size="small">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default InventoryRequests;
