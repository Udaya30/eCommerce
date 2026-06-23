"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const Payment_1 = __importDefault(require("../models/Payment"));
async function seedMerchant() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is missing in .env");
    }
    await mongoose_1.default.connect(mongoUri);
    await Payment_1.default.deleteMany();
    await Payment_1.default.create({
        businessName: "Mini Store",
        upiId: "udhayalakshmi30@okhdfcbank",
        bankAccountLast4: "1234",
        isActive: true,
    });
    console.log("Merchant seeded");
    await mongoose_1.default.disconnect();
}
exports.default = seedMerchant;
