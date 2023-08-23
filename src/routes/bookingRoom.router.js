import express from 'express';
import { bookingRoomController } from '../controllers/index.js';
import { validationError, authValidation } from '../middleware/validation/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, bookingRoomController.bookingRoom);

export default router;
