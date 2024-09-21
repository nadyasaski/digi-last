const mongoose = require('mongoose');
const Customer = require('./customerModel');

const orderItemSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    item_quantity: {
        type: Number,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    },
    item_size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    }
});

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    order_name: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    order_items: [orderItemSchema],
    customer: {
        type: Customer.schema,
        required: true
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;