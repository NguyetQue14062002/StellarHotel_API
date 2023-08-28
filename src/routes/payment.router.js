import express from 'express';
import {paymentController} from '../controllers/index.js';
import { verifyToken, isClient, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/create_payment_url',verifyToken, isClient, paymentController.createPayment);
router.get('/vnpay_return', paymentController.vnpayReturn);
router.get('/transaction',verifyToken, isClient, paymentController.getTransaction);

router.get('/getAllpayment',verifyToken, isAdmin, paymentController.getAllPayment);

export default router;