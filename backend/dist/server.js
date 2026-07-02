"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const PORT = process.env.PORT || 5000;
app_1.default.use("/api/merchants", paymentRoutes_1.default);
const start = async () => {
    await (0, db_1.connectDB)();
    app_1.default.listen(PORT, () => console.log(`Server running on ${PORT}`));
};
start();
