import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    upiId: { type: String, required: true, unique: true },
    bankAccountLast4: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Merchant", merchantSchema);