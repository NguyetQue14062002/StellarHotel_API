import { userController } from '../controllers/index.js';
import express from 'express';

const router = express.Router();


router.patch('/update-user', userController.updateUser);

router.get('/', userController.getAllUser);

export default router;
