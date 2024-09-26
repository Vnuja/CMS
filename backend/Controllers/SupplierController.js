const Supplier = require('../Model/SupplierModel');

// Create a new supplier
exports.createSupplier = async (req, res) => {
    try {
        const { name, email, quality, phone } = req.body;

        // Validate required fields
        if (!name || !email || !quality || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSupplier = new Supplier({
            name,
            email,
            quality,
            phone
        });

        await newSupplier.save();
        res.status(201).json({ message: 'Supplier created successfully', supplier: newSupplier });
    } catch (error) {
        console.error('Error creating supplier:', error); // Log the entire error
        res.status(500).json({ message: 'Error creating supplier', error: error.message });
    }
};


// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving suppliers', error });
    }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving supplier', error });
    }
};

// Update a supplier by ID
exports.updateSupplier = async (req, res) => {
    try {
        const { name, email, quality, phone } = req.body;

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { name, email, quality, phone },
            { new: true } // Return the updated supplier
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier', error });
    }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error });
    }
};
