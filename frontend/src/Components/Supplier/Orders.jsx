import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';

const Orders = () => {
    // Sample data for the table
    const rows = [
        { orderId: '01', quotationNo: '02', inventoryReqNo: '02', supplier: 'Kavindu Nanayakkara', status: 'PAYMENT PENDING' },
        { orderId: '02', quotationNo: '04', inventoryReqNo: '03', supplier: 'Nimeshka Hewage', status: 'COMPLETED' }
    ];

    const renderStatusChip = (status) => {
        if (status === 'PAYMENT PENDING') {
            return <Chip label="PAYMENT PENDING" color="warning" />;
        } else if (status === 'COMPLETED') {
            return <Chip label="COMPLETED" color="success" />;
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
                    <Table sx={{ minWidth: 650 }} aria-label="latest orders table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ORDER ID</TableCell>
                                <TableCell>QUOTATION NO</TableCell>
                                <TableCell>INVENTORY REQ NO</TableCell>
                                <TableCell>SUPPLIER</TableCell>
                                <TableCell>STATUS</TableCell>
                                <TableCell>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.orderId}>
                                    <TableCell>{row.orderId}</TableCell>
                                    <TableCell>{row.quotationNo}</TableCell>
                                    <TableCell>{row.inventoryReqNo}</TableCell>
                                    <TableCell>{row.supplier}</TableCell>
                                    <TableCell>{renderStatusChip(row.status)}</TableCell>
                                    <TableCell>
                                        {row.status === 'PAYMENT PENDING' ? (
                                            <Button variant="contained" color="warning" size="small">Complete</Button>
                                        ) : (
                                            <Button variant="contained" color="warning" size="small" disabled>Complete</Button>
                                        )}
                                        &nbsp;
                                        <Button variant="contained" color="primary" size="small">Details</Button>&nbsp;
                                        <Button variant="contained" color="error" size="small">Delete</Button>
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

export default Orders;
