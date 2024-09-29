import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, Grid, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddEmployee from '../Admin/Employees/AddEmployee'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees";


function Sidebar() {
  return (
    <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
      <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsandu</Typography>
      <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee Manager</Typography>
      <Box sx={{ paddingTop: 4 }}>
        <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', backgroundColor: '#FBBF24', color: '#FFF' }}>
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

function SummaryStats() {
  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      <Grid item xs={12} sm={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Total Employees</Typography>
          <Typography variant="h4" sx={{ color: '#FF0000' }}>141</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Project Requests</Typography>
          <Typography variant="h4" sx={{ color: '#FFAB00' }}>24</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

const fetchEmployees = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees().then(data => {
      setEmployees(data);
    }).catch(error => {
      console.error("Error fetching employees:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/employee/${id}`); // Navigate to the employee details page
  };



  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setEmployees(prev => prev.filter(employee => employee._id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Position', 'Phone', 'Address']],
      body: employees.map(employee => [employee.EMPID, employee.name, employee.email, employee.position, employee.phone, employee.address]),
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

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchEmployees().then(data => {
        setEmployees(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching employees:", error);
      });
      return;
    }

    const filteredEmployees = employees.filter(employee =>
      Object.values(employee).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setEmployees(filteredEmployees);
    setNoResults(filteredEmployees.length === 0);
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeForm(true);
  };

  const handleBack = () => {
    setShowAddEmployeeForm(false);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
      {showAddEmployeeForm ? (
        <Box>
          <AddEmployee onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            Employees
          </Typography>



          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
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
                  {noResults ? (
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
        </>
      )}
    </Box>
  );
}

const projects = [
  { name: 'House Colombo', id: 1, status: 'Complete' },
  { name: 'Lanka Hospitals', id: 3, status: 'PENDING' },
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
                <TableCell>
                                    <Button variant="contained" sx={{ backgroundColor: project.status === 'PENDING' ? '#FFAB00' : '#00C853', color: '#FFF' }}>
                                        {project.status}
                                    </Button>
                                </TableCell>                <TableCell>
                                <Button sx={{ backgroundColor: '#FEC304', color: 'white', marginRight: 1 }}>Details</Button>
                  <Button sx={{ backgroundColor: '#000', color: 'white' }}>Delete</Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default function el() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <SummaryStats />
        <EmployeeList />
        <ProjectRequests />

      </Box>
    </Box>
  );
}
