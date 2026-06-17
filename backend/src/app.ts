import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import SignupRoute from "./routes/signupRoute";
import LoginRoute from "./routes/loginRoute";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", SignupRoute);
app.use("/api/auth", LoginRoute);
app.use("/api/orders", orderRoutes);

export default app;