"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = __importDefault(require("../models/Product"));
const router = (0, express_1.Router)();
router.get("/", async (_req, res) => {
    const products = await Product_1.default.find();
    res.json(products);
});
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid product id" });
    }
    const product = await Product_1.default.findOne({ id });
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});
exports.default = router;
