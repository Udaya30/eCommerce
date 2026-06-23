"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const Order_1 = __importDefault(require("../models/Order"));
class OrderService {
    async getAllOrders() {
        try {
            return await Order_1.default.find();
        }
        catch (error) {
            throw new Error('Failed to fetch orders');
        }
    }
    async getOrderById(id) {
        try {
            return await Order_1.default.findById(id);
        }
        catch (error) {
            throw new Error('Failed to fetch order');
        }
    }
    async getUserOrders(userId) {
        try {
            return await Order_1.default.find({ userId });
        }
        catch (error) {
            throw new Error('Failed to fetch user orders');
        }
    }
    async createOrder(orderData) {
        try {
            const order = new Order_1.default(orderData);
            return await order.save();
        }
        catch (error) {
            throw new Error('Failed to create order');
        }
    }
    async updateOrder(id, orderData) {
        try {
            return await Order_1.default.findByIdAndUpdate(id, orderData, { new: true });
        }
        catch (error) {
            throw new Error('Failed to update order');
        }
    }
    async cancelOrder(id) {
        try {
            return await Order_1.default.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
        }
        catch (error) {
            throw new Error('Failed to cancel order');
        }
    }
}
exports.OrderService = OrderService;
exports.default = new OrderService();
