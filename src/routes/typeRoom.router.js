import express from 'express';
import { typeRoomController } from '../controllers/index.js';
import upload from '../middleware/uploadMedia.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', typeRoomController.filterTypeRooms);
router.get('/get-type-room-by-id', typeRoomController.getTypeRoomById);
router.patch ('/update-typeroom', verifyToken, isAdmin, upload.array('image', 10), typeRoomController.updateTypeRoom);

export default router;
