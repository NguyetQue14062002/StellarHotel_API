import express from 'express';
import { bookingRoomController } from '../controllers/index.js';
import { validationError, authValidation } from '../middleware/validation/index.js';

const router = express.Router();

router.post('/', bookingRoomController.bookingRoom);

export default router;
