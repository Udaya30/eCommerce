import { Request, Response } from 'express';
import Order from '../models/Order';
import User from '../models/User';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const orders = await Order.find({ userId: user._id });
    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, items, totalAmount, shippingAddress } = req.body;

    if (!email || !items || !totalAmount || !shippingAddress) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const order = new Order({
      userId: user._id,
      items,
      totalAmount,
      shippingAddress,
      status: 'pending',
    });

    await order.save();

    res.status(201).json({ 
      message: 'Order created successfully',
      order: {
        id: order._id,
        userId: order.userId,
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ message: 'Status is required' });
      return;
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json({ message: 'Order updated', order });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
};

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, orderId, amount, paymentMethod } = req.body;

    if (!email || !orderId || !amount || !paymentMethod) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Verify amount matches order total
    if (order.totalAmount !== amount) {
      res.status(400).json({ message: 'Payment amount does not match order total' });
      return;
    }

    // Mock payment processing - in real scenario, integrate with payment gateway (Stripe, PayPal, etc.)
    console.log(`Processing payment of ₹${amount} for order ${orderId} via ${paymentMethod}`);

    // Update order status to processing
    order.status = 'processing';
    await order.save();

    res.json({
      message: 'Payment processed successfully',
      order: {
        id: order._id,
        status: order.status,
        totalAmount: order.totalAmount,
      },
      paymentDetails: {
        transactionId: `TXN_${Date.now()}`,
        amount,
        paymentMethod,
        status: 'success',
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
};
