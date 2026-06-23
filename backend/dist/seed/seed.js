"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_seed_1 = __importDefault(require("./products.seed"));
const payment_seed_1 = __importDefault(require("./payment.seed"));
async function run() {
    await (0, payment_seed_1.default)();
    await (0, products_seed_1.default)();
}
run().catch(console.error);
