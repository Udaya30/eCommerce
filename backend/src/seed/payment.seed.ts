import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Merchant from "../models/Payment";

async function seedMerchant() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in .env");
  }

  await mongoose.connect(mongoUri);

  await Merchant.deleteMany();

  await Merchant.create({
    businessName: "Mini Store",
    upiId: "udhayalakshmi30@okhdfcbank",
    bankAccountLast4: "1234",
    isActive: true,
  });

  console.log("Merchant seeded");
  await mongoose.disconnect();
}

seedMerchant().catch((err) => {
  console.error(err);
  process.exit(1);
});