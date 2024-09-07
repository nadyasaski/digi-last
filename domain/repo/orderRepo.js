const Order = require('../model/orderModel');

const getAllOrders = async () => {
    return await Order.find({});
};

const getOrderById = async (orderId) => {
    return await Order.findOne({ orderId });
};

const createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    return await newOrder.save();
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
};