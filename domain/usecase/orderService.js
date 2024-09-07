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
        console.log(orderData)
        const orderId = uuidv4();
        let items = [];
        let items2 = [];
        let total_price = 0;

        console.log('Received orderData:', JSON.stringify(orderData));
        items2 = orderData.orderItems
        console.log(items2)
        for (i = 0; items2.length; i++) {
            if (!items2.item_name || !items2.item_quantity || !items2.item_price || !items2.item_size) {
                throw new Error('Invalid item data');
        }
        // orderData.order_items.forEach(item => {
        //     if (!item.item_name || !item.item_quantity || !item.item_price || !item.item_size) {
        //         throw new Error('Invalid item data');
        //     }

            item.item_id = uuidv4();
            let itemPrice = item.item_price * item.item_quantity;
            items.push(item);
            total_price += itemPrice;
        };

        if (!orderData.customer.customer_id) {                  //JIC kl gada id
            orderData.customer.customer_id = uuidv4();
        }

        const order = {
            order_id: orderId,
            order_name: orderData.order_name,
            total_price: total_price,
            status: orderData.status,
            order_items: items,
            customer: orderData.customer,
        };

        console.log('Order to be created:', order)

        const createdOrder = await orderRepo.createOrder(order);
        return createdOrder;
    } catch (error) {
        console.error('Failed to create order:', error);
        throw new Error(`Failed to create order AAA: ${error}`);
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
};
