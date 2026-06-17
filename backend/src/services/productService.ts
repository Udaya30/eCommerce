import Product from '../models/Product';
import { IProduct } from '../models/Product';

export class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(id: string): Promise<IProduct | null> {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }

  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
    try {
      return await Product.findByIdAndUpdate(id, productData, { new: true });
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }

  async getProductsByCategory(category: string): Promise<IProduct[]> {
    try {
      return await Product.find({ category: { $in: [category] } });
    } catch (error) {
      throw new Error('Failed to fetch products by category');
    }
  }
}

export default new ProductService();
