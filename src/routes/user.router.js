import { userController } from '../controllers/index.js';
import express from 'express';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/update-user', userController.updateUser);

router.get('/', userController.getAllUser);
router.get('/get-transaction-history', verifyToken, isClient, userController.getTransactionHistory);

export default router;
