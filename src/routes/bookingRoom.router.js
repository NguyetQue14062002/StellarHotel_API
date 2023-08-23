import express from 'express';
import { bookingRoomController } from '../controllers/index.js';
import { validationError, bookingRoomValidation } from '../middleware/validation/index.js';
import { verifyToken, isClient } from '../middleware/authMiddleware.js';

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

export default router;
