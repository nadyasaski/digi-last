const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    customer_address: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Customer', CustomerSchema);