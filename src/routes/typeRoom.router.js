import express from 'express';
import { typeRoomController } from '../controllers/index.js';
import upload from '../middleware/uploadMedia.js';

const router = express.Router();

router.get('/', typeRoomController.filterTypeRooms);
router.post ('/multiple_uploads', upload.array('image', 10), typeRoomController.updateTypeRoom);

export default router;
