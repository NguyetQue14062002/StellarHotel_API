import authController from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router();


router.post('/sendotp', authController.sendOTP);
router.post('/checkotp', authController.checkOTP);
router.post('/resetpass', authController.resetPassword);
router.post('/forgetpass', authController.forgetpass);
export default router;
