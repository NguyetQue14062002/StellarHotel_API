import express from 'express';
import { typeRoomController } from '../controllers/index.js';

const router = express.Router();

router.get('/', typeRoomController.filterTypeRooms);

export default router;
