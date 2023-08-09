import { userController } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/update-user', userController.updateUser);

router.get('/getAllUser', userController.getAllUser);

export default router;
