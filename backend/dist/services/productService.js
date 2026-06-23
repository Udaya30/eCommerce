"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = __importDefault(require("../models/Product"));
class ProductService {
    async getAllProducts() {
        try {
            return await Product_1.default.find();
        }
        catch (error) {
            throw new Error('Failed to fetch products');
        }
    }
    async getProductById(id) {
        try {
            return await Product_1.default.findById(id);
        }
        catch (error) {
            throw new Error('Failed to fetch product');
        }
    }
    async createProduct(productData) {
        try {
            const product = new Product_1.default(productData);
            return await product.save();
        }
        catch (error) {
            throw new Error('Failed to create product');
        }
    }
    async updateProduct(id, productData) {
        try {
            return await Product_1.default.findByIdAndUpdate(id, productData, { new: true });
        }
        catch (error) {
            throw new Error('Failed to update product');
        }
    }
    async deleteProduct(id) {
        try {
            return await Product_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error('Failed to delete product');
        }
    }
    async getProductsByCategory(category) {
        try {
            return await Product_1.default.find({ category: { $in: [category] } });
        }
        catch (error) {
            throw new Error('Failed to fetch products by category');
        }
    }
}
exports.ProductService = ProductService;
exports.default = new ProductService();
