import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddUser from './AddUser';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function UserDetails() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      setAllUsers(data);
      setUsers(data);
    }).catch(error => {
      console.error("Error fetching users:", error);
    });
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admindashboard/update-user/${userId}`);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${URL}/${userId}`);
      if (response.status === 200) {
        setAllUsers(prev => prev.filter(user => user.userId !== userId));
        setUsers(prev => prev.filter(user => user.userId !== userId));
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("User Details Report", 10, 10);

    doc.autoTable({
      head: [['User ID', 'Username', 'Name', 'Email', 'Phone', 'Type', 'Password']],
      body: users.map(user => [user.userId, user.userName, user.name, user.email, user.phone, user.type, user.password]),
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

    doc.save('user-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setUsers(allUsers);
      setNoResults(false);
      return;
    }

    const filteredUsers = allUsers.filter(user =>
      Object.values(user).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  const handleAddUser = () => {
    setShowAddUserForm(true);
  };

  const handleBack = () => {
    setShowAddUserForm(false);
  };

  return (
    <Box>
      {showAddUserForm ? (
        <Box>
          <AddUser onBack={handleBack} />
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
              onClick={handleAddUser}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add User
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Type</TableCell>
                   
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No users found.</TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.userId}>
                        <TableCell>{user.userId}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.type}</TableCell>
                        
                        <TableCell>
                          <IconButton onClick={() => handleEdit(user.userId)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteUser(user.userId)} sx={{ color: 'error.main' }}>
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

export default UserDetails;
