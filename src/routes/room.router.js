import { roomController } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/', roomController.getAvailableRooms);
router.post('/addRoom', roomController.addRoom);
router.patch('/update', roomController.updateRoom );

export default router;
