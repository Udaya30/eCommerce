"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPayment = exports.cancelOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getOrders = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
const getOrders = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            res.status(400).json({ message: 'Email is required' });
            return;
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const orders = await Order_1.default.find({ userId: user._id });
        res.json({ orders });
    }
    catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_1.default.findById(id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ order });
    }
    catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};
exports.getOrderById = getOrderById;
const createOrder = async (req, res) => {
    try {
        const { email, items, totalAmount, shippingAddress } = req.body;
        if (!email || !items || !totalAmount || !shippingAddress) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const order = new Order_1.default({
            userId: user._id,
            items,
            totalAmount,
            shippingAddress,
            status: 'pending',
        });
        await order.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order._id,
                userId: order.userId,
                items: order.items,
                totalAmount: order.totalAmount,
                status: order.status,
                shippingAddress: order.shippingAddress,
                createdAt: order.createdAt,
            }
        });
    }
    catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            res.status(400).json({ message: 'Status is required' });
            return;
        }
        const order = await Order_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order updated', order });
    }
    catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};
exports.updateOrder = updateOrder;
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_1.default.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order cancelled', order });
    }
    catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({ error: 'Failed to cancel order' });
    }
};
exports.cancelOrder = cancelOrder;
const processPayment = async (req, res) => {
    try {
        const { email, orderId, amount, paymentMethod } = req.body;
        if (!email || !orderId || !amount || !paymentMethod) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const order = await Order_1.default.findById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        // Verify amount matches order total
        if (order.totalAmount !== amount) {
            res.status(400).json({ message: 'Payment amount does not match order total' });
            return;
        }
        // Mock payment processing - in real scenario, integrate with payment gateway (Stripe, PayPal, etc.)
        console.log(`Processing payment of ₹${amount} for order ${orderId} via ${paymentMethod}`);
        // Update order status to processing
        order.status = 'processing';
        await order.save();
        res.json({
            message: 'Payment processed successfully',
            order: {
                id: order._id,
                status: order.status,
                totalAmount: order.totalAmount,
            },
            paymentDetails: {
                transactionId: `TXN_${Date.now()}`,
                amount,
                paymentMethod,
                status: 'success',
                timestamp: new Date(),
            },
        });
    }
    catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
};
exports.processPayment = processPayment;
