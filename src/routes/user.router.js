import express from 'express';
import { userController } from '../controllers/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, userController.getAllUser);
router.patch('/update-user', verifyToken, isAdmin, userController.updateUser);
router.get('/profile', verifyToken, isClient, userController.getUser);
router.patch('/update-profile', verifyToken, isClient, userController.updateProfile);
router.delete('/delete-user', verifyToken, isAdmin, userController.deleteUser);


export default router;
