import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TextField, Paper, Avatar, Typography
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddSupplier from '../Admin/Suppliers/AddSupplier';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/suppliers";

const fetchSuppliers = async () => {
    try {
        const response = await axios.get(URL);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSuppliers().then(data => {
            setSuppliers(data);
        }).catch(error => {
            console.error("Error fetching suppliers:", error);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/suppliers/${id}`);
    };

    const deleteSupplier = async (id) => {
        try {
            console.log(`Attempting to delete supplier with ID: ${id}`);
            const response = await axios.delete(`${URL}/${id}`);

            if (response.status === 200) {
                setSuppliers(prev => prev.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text("Supplier Details Report", 10, 10);
        doc.autoTable({
            head: [['Name', 'Email', 'Quality', 'Phone']],
            body: suppliers.map(item => [
                item.name, item.email, item.quality, item.phone
            ]),
            startY: 20,
        });
        doc.save('supplier-details.pdf');
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            fetchSuppliers().then(data => {
                setSuppliers(data);
                setNoResults(false);
            }).catch(error => {
                console.error("Error fetching suppliers:", error);
            });
            return;
        }

        const filteredSuppliers = suppliers.filter(item =>
            Object.values(item).some(field =>
                field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setSuppliers(filteredSuppliers);
        setNoResults(filteredSuppliers.length === 0);
    };

    const handleAddSupplier = () => {
        setShowAddSupplierForm(true);
    };

    const handleBack = () => {
        setShowAddSupplierForm(false);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
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
            <Box sx={{ flex: 1, padding: 4, backgroundColor: '#F5F6FA' }}>
                {showAddSupplierForm ? (
                    <AddSupplier onBack={handleBack} />
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <TextField
                                label="Search Supplier"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 1,
                                    width: '300px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#D9D9D9',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FEC304',
                                        },
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FEC304', color: 'white' }}
                                onClick={handleAddSupplier}
                                startIcon={<Add />}
                            >
                                Register Supplier
                            </Button>
                        </Box>

                        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Quality</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {noResults ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">No suppliers found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        suppliers.map((item) => (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Avatar alt={item.name} src={item.avatar} sx={{ marginRight: 2 }} />
                                                        {item.name}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ width: 100, height: 10, backgroundColor: '#000', marginRight: 1 }}>
                                                            <Box sx={{ width: `${item.quality}%`, height: '100%', backgroundColor: '#FEC304' }} />
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{item.phone}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: '#FFC107', color: 'black', marginRight: 1 }}
                                                        onClick={() => handleEdit(item._id)} // Use item._id here
                                                    >
                                                        Details
                                                    </Button>
                                                    <Button sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => deleteSupplier(item._id)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default SupplierList;
