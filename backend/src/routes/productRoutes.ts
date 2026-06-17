import { Router } from "express";
import Product from "../models/Product";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (_req, res) => {
  const products = await Product.find();
  res.json(products);
});
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const product = await Product.findOne({ id });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

export default router;