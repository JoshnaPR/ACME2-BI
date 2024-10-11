const mongoose = require('mongoose');
const { type } = require('os');

const braSchema = mongoose.Schema({
    type: {type: String, required: true},
    size: {type: String, required: true},
    quantity: {type: Number, required: true},
});

const Bra = mongoose.model('Bra', braSchema);
module.exports = Bra;