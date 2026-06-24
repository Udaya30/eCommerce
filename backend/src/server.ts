// server.ts
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import merchantRoutes from "./routes/paymentRoutes";

const PORT = process.env.PORT || 5000;
app.use("/api/merchants", merchantRoutes);
const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};
app.use(cors({
  origin: ["http://localhost:5173", "https://frontend-ecommerce-8vwh.onrender.com"],
  credentials: true,
}));
app.use(cookieParser());

start();