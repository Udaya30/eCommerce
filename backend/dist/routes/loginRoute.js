"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
router.post("/login", async (req, res) => {
    try {
        console.log("login route hit");
        console.log("body:", req.body);
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found. Please sign up first" });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login failed" });
    }
});
router.get("/user", authMiddleware_1.authMiddleware, authController_1.getUser);
router.post("/update-location", authMiddleware_1.authMiddleware, authController_1.updateLocation);
exports.default = router;
