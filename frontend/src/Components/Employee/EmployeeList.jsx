import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
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
          <Button
            component={Link}
            to="/EmployeeDashboard"
            startIcon={<DashboardIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/EmployeeList"
            startIcon={<PeopleIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Employees
          </Button>
          <Button
            component={Link}
            to="/attendance"
            startIcon={<ListAltIcon />}
            fullWidth
            sx={{ justifyContent: 'flex-start', color: '#FFF' }}
          >
            Attendance
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
    navigate(`/admindashboard/update-employee/${id}`);
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

          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search Employees"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '250px',
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ borderRadius: 2 }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FFC107', color: 'black', borderRadius: 2, marginLeft: 'auto' }}
              onClick={handleAddEmployee}
              startIcon={<Add />}
            >
              Register Employees
            </Button>
          </Box>

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
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#000000', color: 'white' }}
                            onClick={() => deleteEmployee(employee._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: '#FFC107', color: 'black', borderRadius: 2 }}
              onClick={handlePDF}
            >
              Download PDF
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
export default function el() {
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
