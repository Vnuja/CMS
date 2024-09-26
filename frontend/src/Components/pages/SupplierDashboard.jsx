import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Info';

// Sidebar Navigation
function Sidebar() {
    return (
        <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
            <Typography variant="h6" sx={{ paddingLeft: 2 }}>Budwin Mendis</Typography>
            <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Supplier Manager</Typography>
            <Box sx={{ paddingTop: 4 }}>
                <Button startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>Dashboard</Button>
                <Button startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>Suppliers</Button>
                <Button startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>Orders</Button>
                <Button startIcon={<DescriptionIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>Quotation</Button>
                <Button startIcon={<AssessmentIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>Supplier Quality</Button>
                <Button startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>Inventory Requests</Button>
            </Box>
        </Box>
    );
}

// Summary Stats
function SummaryStats() {
    return (
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={3}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Total Orders</Typography>
                    <Typography variant="h4" sx={{ color: '#FF0000' }}>141</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Total Suppliers</Typography>
                    <Typography variant="h4" sx={{ color: '#00C853' }}>24</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Pending Inventory Requests</Typography>
                    <Typography variant="h4" sx={{ color: '#FFAB00' }}>14</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Total Quotations</Typography>
                    <Typography variant="h4" sx={{ color: '#3D5AFE' }}>150</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

// Latest Quotation Table
function LatestQuotation() {
    const rows = [
        { id: 1, quotationNo: '01', inventoryReqNo: '01', supplier: 'Sanjaya Dayarathna', amount: 'Rs.15,000,000.00', status: 'PENDING' },
        { id: 2, quotationNo: '02', inventoryReqNo: '02', supplier: 'Kavindu Nanayakkara', amount: 'Rs.33,000,000.00', status: 'APPROVED' },
        { id: 3, quotationNo: '03', inventoryReqNo: '03', supplier: 'Kavindu Nanayakkara', amount: 'Rs.42,000,000.00', status: 'PENDING' },
        { id: 4, quotationNo: '04', inventoryReqNo: '03', supplier: 'Nimeshka Hewage', amount: 'Rs.61,000,000.00', status: 'APPROVED' },
    ];

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Latest Quotation</Typography>
            <TableContainer>
                <Table>
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
                            <TableRow key={row.id}>
                                <TableCell>{row.quotationNo}</TableCell>
                                <TableCell>{row.inventoryReqNo}</TableCell>
                                <TableCell>{row.supplier}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>
                                    <Button variant="contained" sx={{ backgroundColor: row.status === 'PENDING' ? '#FFAB00' : '#00C853', color: '#FFF' }}>
                                        {row.status}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary"><DetailsIcon /></IconButton>
                                    <IconButton color="success"><CheckIcon /></IconButton>
                                    <IconButton color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

// Latest Orders Table
function LatestOrders() {
    const rows = [
        { id: 1, orderId: '01', quotationNo: '02', inventoryReqNo: '02', supplier: 'Kavindu Nanayakkara', status: 'PAYMENT PENDING' },
        { id: 2, orderId: '02', quotationNo: '04', inventoryReqNo: '03', supplier: 'Nimeshka Hewage', status: 'COMPLETED' },
    ];

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Latest Orders</Typography>
            <TableContainer>
                <Table>
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
                            <TableRow key={row.id}>
                                <TableCell>{row.orderId}</TableCell>
                                <TableCell>{row.quotationNo}</TableCell>
                                <TableCell>{row.inventoryReqNo}</TableCell>
                                <TableCell>{row.supplier}</TableCell>
                                <TableCell>
                                    <Button variant="contained" sx={{ backgroundColor: row.status === 'PAYMENT PENDING' ? '#FFAB00' : '#00C853', color: '#FFF' }}>
                                        {row.status}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary"><DetailsIcon /></IconButton>
                                    <IconButton color="success"><CheckIcon /></IconButton>
                                    <IconButton color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default function Dashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
                <SummaryStats />
                <LatestQuotation />
                <LatestOrders />
            </Box>
        </Box>
    );
}
