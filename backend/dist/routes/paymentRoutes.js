"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Payment_1 = __importDefault(require("../models/Payment"));
const router = (0, express_1.Router)();
router.get("/:id", async (req, res) => {
    console.log("merchant route hit:", req.params.id);
    const merchant = await Payment_1.default.findById(req.params.id);
    if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
    }
    if (!merchant.isActive || !merchant.upiId) {
        return res.status(400).json({ message: "Merchant payment account is not active" });
    }
    return res.json(merchant);
});
exports.default = router;
