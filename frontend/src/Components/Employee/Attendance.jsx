import React, { useState, useEffect } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const URL = "http://localhost:4001/employees";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Sidebar() {
    return (
        <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
            <Typography variant="h6" sx={{ paddingLeft: 2, fontWeight: 'bold' }}>Hiruna Kithsandu</Typography>
            <Typography variant="subtitle2" sx={{ paddingLeft: 2, color: '#ccc' }}>Employee Manager</Typography>
            <Box sx={{ paddingTop: 4 }}>
                <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Dashboard
                </Button>
                <Button component={Link} to="/EmployeeList" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
                    Employees
                </Button>
                <Button component={Link} to="/attendance" startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF', backgroundColor: '#FBBF24' }}>
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

const fetchEmployees = async () => {
    try {
        const response = await axios.get(URL); // Use the URL variable here
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees().then((data) => {
            console.log(data); // Log to check if data is fetched
            setEmployees(data);
        }).catch((error) => {
            console.error('Error fetching employees:', error);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/employee/${id}`); // Navigate to the employee details page
    };

    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text('Employee Details Report', 10, 10);

        doc.autoTable({
            head: [['ID', 'Name', 'Email', 'Position', 'Phone', 'Address']],
            body: employees.map((employee) => [employee.EMPID, employee.name, employee.email, employee.position, employee.phone, employee.address]),
            startY: 20,
            margin: { top: 20 },
            styles: {
                overflow: 'linebreak',
                fontSize: 10,
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
            },
        });

        doc.save('employee-details.pdf');
    };

    const data = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                data: [85, 15],
                backgroundColor: ['#3b82f6', '#ef4444'],
            },
        ],
    };

    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Date', 'Punch In', 'Punch Out', 'Availability']],
            body: [],
        });
        doc.save('attendance-report.pdf');
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={3}>
                {/* Employee Table Section (8/12 columns) */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1, boxShadow: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                            Attendance List
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            All Employees
                        </Typography>
                        <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                                    <TableRow>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Job Role</strong></TableCell>
                                        <TableCell><strong>Phone</strong></TableCell>
                                        <TableCell><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">No employees found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        employees.map((employee) => (
                                            <TableRow key={employee._id}>
                                                <TableCell>{employee.name}</TableCell>
                                                <TableCell>{employee.email}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.phone}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: '#FFC107', color: 'black', marginRight: 1 }}
                                                        onClick={() => handleEdit(employee._id)}
                                                    >
                                                        Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>

                {/* Attendance Summary Section (4/12 columns) */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Total Attendance
                        </Typography>
                        <Pie data={data} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                            <Typography variant="body1" sx={{ color: '#3b82f6' }}>
                                Present: 85%
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#ef4444' }}>
                                Absent: 15%
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

// Main Export Component
export default function El() {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar takes a fixed width */}
            <Sidebar />

            {/* Main content fills the remaining space */}
            <Box sx={{ flexGrow: 1 }}>
                <EmployeeList />
            </Box>
        </Box>
    );
}
