import { userController } from '../controllers/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

//client
router.get('/profile', verifyToken, isClient, userController.getUser);
router.patch('/update-profile', verifyToken, isClient, userController.updateProfile);

//Admin
router.get('/', verifyToken, isAdmin, userController.getAllUser);
router.patch('/update-user', verifyToken, isAdmin, userController.updateUser);
router.delete('/delete-user', verifyToken, isAdmin, userController.deleteUser);


export default router;
