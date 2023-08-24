import { roomController } from '../controllers/index.js';
import express from 'express';
import { validationError, roomValidation } from '../middleware/validation/index.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get(
    '/get-number-available-rooms',
    roomValidation.validateGetNumberAvailableRooms,
    validationError,
    roomController.getNumberAvailableRooms,
);
router.post('/create-room', verifyToken, isAdmin, validationError, roomController.createRoom);
router.get(
    '/get-parameters-room',
    roomValidation.validateGetParametersRoom,
    validationError,
    roomController.getParametersRoom,
);
router.get(
    '/',
    roomValidation.validateGetRoomsByTypeRoom,
    validationError,
    verifyToken,
    isAdmin,
    roomController.getRoomsByTypeRoom,
);
router.patch('/update', verifyToken, isAdmin, roomController.updateRoom);

export default router;
