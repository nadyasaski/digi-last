const express = require('express');
const orderHandler = require('../handler/orderHandler');
const verifyToken = require('../middleware/jwt');

const router = express.Router();

router.post("/", verifyToken, orderHandler.createOrder);        // Create - Protected
router.get("/", verifyToken, orderHandler.getAllOrders);        // Get all orders - Protected
router.get("/:id", verifyToken, orderHandler.getOrderById);    // Get one by ID - Protected

module.exports = router;