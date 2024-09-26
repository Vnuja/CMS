import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton} from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddEmployee from './AddEmployee'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees";

const fetchEmployees = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function EmployeeDetails() {
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
    <Box>
      {showAddEmployeeForm ? (
        <Box>
          <AddEmployee onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '200px',
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
              color="secondary"
              onClick={handleAddEmployee}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Employee
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No employee found.</TableCell>
                    </TableRow>
                  ) : (
                    employees.map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell>{employee.EMPID}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.address}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(employee._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteEmployee(employee._id)} sx={{ color: 'error.main' }}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              color="primary"
              onClick={handlePDF}
              sx={{ marginTop: 2, borderRadius: 2 }}
            >
              <Print /> Download
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default EmployeeDetails;
