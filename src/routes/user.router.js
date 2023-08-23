import express from 'express';
import { userController } from '../controllers/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, isClient, userController.getUser);
router.patch('/update-profile', verifyToken, isClient, userController.updateProfile);
router.get('/', verifyToken, isAdmin, userController.getAllUser);
router.patch('/update-user', verifyToken, isAdmin, userController.updateUser);
router.delete('/delete-user', verifyToken, isAdmin, userController.deleteUser);
router.get('/get-transaction-history', verifyToken, isClient, userController.getTransactionHistory);

export default router;
