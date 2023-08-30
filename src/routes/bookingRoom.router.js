import express from 'express';
import { bookingRoomController } from '../controllers/index.js';
import { validationError, bookingRoomValidation } from '../middleware/validation/index.js';
import { verifyToken, isClient, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
    '/',
    bookingRoomValidation.validateBookingRoom,
    validationError,
    verifyToken,
    isClient,
    bookingRoomController.bookingRoom,
);
router.get(
    '/get-total-prices',
    bookingRoomValidation.validateGetPrices,
    validationError,
    bookingRoomController.getTotalPrices,
);
router.get('/get-transaction-history', verifyToken, isClient, bookingRoomController.getTransactionHistory);
router.get('/get-all-transactions-history', verifyToken, isAdmin, bookingRoomController.getAllTransactionHistory);

router.post('/create_payment_url',verifyToken, isClient, bookingRoomController.createPayment);
router.get('/vnpay_return', bookingRoomController.vnpayReturn);
export default router;
