const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure this is unique
    quality: { type: String, required: true },
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Supplier', supplierSchema);
