const orderService = require('../domain/usecase/orderService');

// Create order
const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        if (!Array.isArray(orderData.order_items) || orderData.order_items.length === 0) {
            throw new Error('Order items are required');
        }
        const createdOrder = await orderService.createOrder(orderData);
        res.status(201).json({ message: "Order created successfully", orderId: createdOrder.order_id });
    } catch (error) {
        console.error('Failed to create order:', error.message);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};


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
