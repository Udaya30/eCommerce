import { Router } from 'express';
import * as orderController from '../controllers/orderController';

const router = Router();

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.post('/payment/process', orderController.processPayment);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.cancelOrder);

export default router;
