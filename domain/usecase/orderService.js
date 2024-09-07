const orderRepo = require('../repo/orderRepo');
const { v4: uuidv4 } = require('uuid');

const getAllOrders = async () => {
    return await orderRepo.getAllOrders();
};

const getOrderById = async (orderId) => {
    const order = await orderRepo.getOrderById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

const createOrder = async (orderData) => {
    try {
        const orderId = uuidv4();
        let items = [];
        let total_price = 0;
        if (!orderData.order_items || orderData.order_items.length === 0) {
            throw new Error('Order items are required');
        }
        orderData.order_items = orderData.order_items.map(item => {
            item.item_id = uuidv4();
            let itemPrice = item.item_price * item.item_quantity;
            items.push(item);
            total_price += itemPrice;
        });
        orderData.customer.customer_id = uuidv4();
        const order = {
            order_id: orderId,
            order_name: orderData.order_name,
            total_price: total_price,
            status: orderData.status,
            order_items: items,
            customer: orderData.customer,
        };
        const createdOrder = await orderRepo.createOrder(order);
        return createdOrder;
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
};
