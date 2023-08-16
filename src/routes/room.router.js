import { roomController } from '../controllers/index.js';
import express from 'express';
import upload from '../middleware/uploadMedia.js';

const router = express.Router();

router.get('/', roomController.filterNumberAvailableRooms);
router.post("/add-room", upload.single('image'), roomController.addRoom);
router.patch('/update', roomController.updateRoom);


export default router;
