import Order from '../models/Order';
import { IOrder } from '../models/Order';

export class OrderService {
  async getAllOrders(): Promise<IOrder[]> {
    try {
      return await Order.find();
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    try {
      return await Order.findById(id);
    } catch (error) {
      throw new Error('Failed to fetch order');
    }
  }

  async getUserOrders(userId: string): Promise<IOrder[]> {
    try {
      return await Order.find({ userId });
    } catch (error) {
      throw new Error('Failed to fetch user orders');
    }
  }

  async createOrder(orderData: Partial<IOrder>): Promise<IOrder> {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }

  async updateOrder(id: string, orderData: Partial<IOrder>): Promise<IOrder | null> {
    try {
      return await Order.findByIdAndUpdate(id, orderData, { new: true });
    } catch (error) {
      throw new Error('Failed to update order');
    }
  }

  async cancelOrder(id: string): Promise<IOrder | null> {
    try {
      return await Order.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    } catch (error) {
      throw new Error('Failed to cancel order');
    }
  }
}

export default new OrderService();
