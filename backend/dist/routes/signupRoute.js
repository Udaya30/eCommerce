"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
router.post("/signup", async (req, res) => {
    try {
        console.log("signup route hit");
        console.log("body:", req.body);
        const { name, email, password } = req.body || {};
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({ name, email, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            message: "User created successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Signup failed" });
    }
});
exports.default = router;
