import { authController } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/sendotp', authController.sendOTP);
router.post('/checkotp', authController.checkOTP);
router.post('/resetpass', authController.resetPassword);
router.post('/forgetpass', authController.forgetpass);

router.post('/reset-password', authController.sendOTP);

export default router;
