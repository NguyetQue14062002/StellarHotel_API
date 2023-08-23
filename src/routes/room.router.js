import { roomController } from '../controllers/index.js';
import express from 'express';
import { validationError, roomValidation } from '../middleware/validation/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get(
    '/get-number-available-rooms',
    roomValidation.validateGetNumberAvailableRooms,
    validationError,
    roomController.getNumberAvailableRooms,
);
router.get(
    '/get-acreage-rooms',
    roomValidation.validateGetAcreageRooms,
    validationError,
    roomController.getAcreageRooms
);
router.get(
    '/get-typeBed-rooms',
    roomValidation.validatetypeBedRooms,
    validationError,
    roomController.getTypeBedRooms
);
router.get('/', verifyToken, isAdmin, roomController.getRoomsByTypeRoom);
router.post('/add-room', verifyToken, isAdmin, roomController.addRoom);
router.patch('/update', verifyToken, isAdmin, roomController.updateRoom);

export default router;