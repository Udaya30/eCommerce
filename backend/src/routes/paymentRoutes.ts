import { Router } from "express";
import Merchant from "../models/Payment";

const router = Router();

router.get("/:id", async (req, res) => {
  console.log("merchant route hit:", req.params.id);
  const merchant = await Merchant.findById(req.params.id);

  if (!merchant) {
    return res.status(404).json({ message: "Merchant not found" });
  }

  if (!merchant.isActive || !merchant.upiId) {
    return res.status(400).json({ message: "Merchant payment account is not active" });
  }

  return res.json(merchant);
});

export default router;