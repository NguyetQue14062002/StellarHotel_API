import { roomController } from '../controllers/index.js';
import express from 'express';


const router = express.Router();

router.get('/', roomController.filterNumberAvailableRooms);
router.post("/add-room", roomController.addRoom);
router.patch('/update', roomController.updateRoom);


export default router;
