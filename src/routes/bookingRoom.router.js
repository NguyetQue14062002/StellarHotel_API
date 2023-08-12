import express from 'express';
import { bookingRoomController } from '../controllers/index.js';

const router = express.Router();

router.post('/', bookingRoomController.bookingRoom);

export default router;