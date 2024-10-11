const express = require('express');
const BraController = require('../Controllers/braController');

const router = express.Router();

router.get('/', BraController.getAllBras);
router.get('/:id', BraController.getBraById);
router.post('/', BraController.createBra);
router.put('/:id', BraController.updateBra);
router.delete('/:id', BraController.deleteBra);

module.exports = router;
