import express from 'express';
import { bookingRoomController } from '../controllers/index.js';
import { validationError, bookingRoomValidation } from '../middleware/validation/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
    '/',
    bookingRoomValidation.validateBookingRoom,
    validationError,
    verifyToken,
    isClient,
    bookingRoomController.bookingRoom,
);

export default router;
