import {roomController} from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.post('/addRoom', roomController.addRoom);
//router.post('/update', roomController.updateRoom);

export default router;