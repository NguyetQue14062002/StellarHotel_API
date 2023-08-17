import express from 'express';
import { typeRoomController } from '../controllers/index.js';
import upload from '../middleware/uploadMedia.js';

const router = express.Router();

router.get('/', typeRoomController.filterTypeRooms);
router.patch ('/update-typeroom', upload.array('image', 10), typeRoomController.updateTypeRoom);

export default router;
