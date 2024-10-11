const Bra = require('../Models/Bra');

// GET all bras
exports.getAllBras = async (req, res) => {
    try {
        const bras = await Bra.find();
        res.json(bras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single bra by ID
exports.getBraById = async (req, res) => {
    try {
        const bra = await Bra.findById(req.params.id);
        if (!bra) return res.status(404).json({ message: 'Bra not found' });
        res.json(bra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new bra
exports.createBra = async (req, res) => {
    const bra = new Bra(req.body);
    try {
        const savedBra = await bra.save();
        res.status(201).json(savedBra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update a bra by ID
exports.updateBra = async (req, res) => {
    try {
        const updatedBra = await Bra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBra) return res.status(404).json({ message: 'Bra not found' });
        res.json(updatedBra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a bra by ID
exports.deleteBra = async (req, res) => {
    try {
        const deletedBra = await Bra.findByIdAndDelete(req.params.id);
        if (!deletedBra) return res.status(404).json({ message: 'Bra not found' });
        res.json({ message: 'Bra deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
