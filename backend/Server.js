require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Import routes
const userRoutes = require('./Routes/UserRoutes');
const employeeRoutes = require('./Routes/EmployeeRoutes');
const authRoutes = require('./Routes/AuthRoutes');
const supplierRoutes = require('./Routes/SupplierRoutes');


// Middleware
app.use(express.json());
app.use(cors()); // You can configure CORS options if needed

// Route middleware
app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/auth', authRoutes);

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 4001;
const DB_URL = 'mongodb+srv://CMS:CMS@cms.6weyt.mongodb.net/';

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}!`);
});
