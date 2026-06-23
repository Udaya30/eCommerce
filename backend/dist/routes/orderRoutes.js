"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = __importDefault(require("../models/Product"));
const router = (0, express_1.Router)();
router.post("/create", async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const product = await Product_1.default.findOne({ id: Number(productId) });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const amount = product.price * Number(quantity);
        const order = {
            id: `ORD-${Date.now()}`,
            productId: product.id,
            productName: product.name,
            quantity: Number(quantity),
            amount,
        };
        return res.json(order);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to create order" });
    }
});
exports.default = router;
