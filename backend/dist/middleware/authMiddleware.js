"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!payload?.userId) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        const user = await User_1.default.findById(payload.userId);
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        req.userId = payload.userId;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;
