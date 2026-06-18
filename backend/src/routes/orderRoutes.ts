import { Router } from "express";
import Product from "../models/Product";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findOne({ id: Number(productId) });

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
  } catch (error) {
    return res.status(500).json({ message: "Failed to create order" });
  }
});

export default router;