import React, { useState } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Avatar, Button, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';   // Import autoTable plugin

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Sidebar() {
    return (
        <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
            <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsandu</Typography>
            <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee Manager</Typography>
            <Box sx={{ paddingTop: 4 }}>
                <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Dashboard
                </Button>
                <Button component={Link} to="/EmployeeList" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Employees
                </Button>
                <Button component={Link} to="/attendance" startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Attendance
                </Button>
                <Button component={Link} to="/payroll" startIcon={<DescriptionIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Payroll
                </Button>
                <Button component={Link} to="/project-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Project Requests
                </Button>
            </Box>
        </Box>
    );
}

const employeesData = [
    { name: 'Sithija Udayawickrama', date: '10/08/2024', punchIn: '9:00 AM', punchOut: '4:00 PM', available: 'Unavailable' },
    { name: 'Dihara Nanayakkara', date: '10/08/2024', punchIn: '8:00 AM', punchOut: '4:30 PM', available: 'Available' },
    { name: 'Venuja Geenodh', date: '09/08/2024', punchIn: '9:30 AM', punchOut: '5:30 PM', available: 'Available' },
    { name: 'Nethum Bandara', date: '09/08/2024', punchIn: '8:00 AM', punchOut: '5:00 PM', available: 'Unavailable' },
    { name: 'Sandupa Wickramasinghe', date: '09/08/2024', punchIn: '11:00 AM', punchOut: '5:40 PM', available: 'Unavailable' },
];

const AttendancePage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter employees based on search query
    const filteredEmployees = employeesData.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pie chart data
    const data = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                data: [63, 22],
                backgroundColor: ['#3b82f6', '#ef4444'],
            },
        ],
    };

    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Date', 'Punch In', 'Punch Out', 'Availability']],
            body: filteredEmployees.map(emp => [emp.name, emp.date, emp.punchIn, emp.punchOut, emp.available]),
        });
        doc.save('attendance-report.pdf');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Attendance List
            </Typography>

            {/* New Box for buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button 
                    variant="contained" 
                    startIcon={<ReceiptIcon />} 
                    sx={{ 
                        marginRight: 1, 
                        backgroundColor: '#FBBF24', 
                        color: '#000', 
                        '&:hover': {
                            backgroundColor: '#EAB308',
                        }
                    }} 
                    onClick={generatePDF} // Call PDF generation on click
                >
                    Attendance Reports
                </Button>
                <Button 
                    variant="contained" 
                    startIcon={<AssignmentIcon />} 
                    sx={{ 
                        backgroundColor: '#000', 
                        color: '#FFF', 
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }} 
                    component={Link} 
                    to="/leave-requests"
                >
                    Leave Requests
                </Button>
            </Box>

            <Grid container spacing={4}>
                {/* Left Section: Employee List */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search Employees"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: <Search sx={{ mr: 1 }} />,
                            }}
                        />
                    </Box>

                    {/* Attendance Table */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Date</strong></TableCell>
                                    <TableCell><strong>Punch In</strong></TableCell>
                                    <TableCell><strong>Punch Out</strong></TableCell>
                                    <TableCell><strong>Availability</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2 }} />
                                                {employee.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{employee.date}</TableCell>
                                        <TableCell>{employee.punchIn}</TableCell>
                                        <TableCell>{employee.punchOut}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: employee.available === 'Available' ? '#34D399' : '#FBBF24',
                                                    color: '#fff',
                                                }}
                                            >
                                                {employee.available}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Right Section: Attendance Summary */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Total Attendance
                        </Typography>
                        <Pie data={data} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                            <Typography variant="body1" sx={{ color: '#3b82f6' }}>
                                Present: 63%
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#ef4444' }}>
                                Absent: 22%
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

// Main Export Component
export default function el() {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar takes a fixed width */}
            <Sidebar />
            
            {/* Main content fills the remaining space */}
            <Box sx={{ flexGrow: 1 }}>
                <AttendancePage />
            </Box>
        </Box>
    );
}
