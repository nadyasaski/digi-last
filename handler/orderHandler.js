const orderService = require('../domain/usecase/orderService');

// Create a new order
const createOrder = async (req, res) => {
    const orderData = req.body;
    orderData["created_by"] = req.user.userId;
    try {
        const createdOrder = await orderService.createOrder({ orderData });
        res.status(201).json({ message: "Order created successfully", orderId: createdOrder.order_id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

// Get an order by order id
const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.getOrderById(orderId);
        res.json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById
};
