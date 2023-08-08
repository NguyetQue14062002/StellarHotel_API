import authController from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router();


router.post('/reset-password', authController.sendOTP);

export default router;
