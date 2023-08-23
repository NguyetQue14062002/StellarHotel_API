import { roomController } from '../controllers/index.js';
import express from 'express';
import { validationError, roomValidation } from '../middleware/validation/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get(
    '/',
    roomValidation.validateGetNumberAvailableRooms,
    validationError,
    roomController.getNumberAvailableRooms,
);
router.post('/create-room', verifyToken, isAdmin, validationError, roomController.createRoom);
router.patch('/update', verifyToken, isAdmin, roomController.updateRoom);

export default router;
