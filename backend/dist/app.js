"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const signupRoute_1 = __importDefault(require("./routes/signupRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://frontend-ecommerce-8vwh.onrender.com"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/products", productRoutes_1.default);
app.use("/api/auth", signupRoute_1.default);
app.use("/api/auth", loginRoute_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/payment", paymentRoutes_1.default);
exports.default = app;
