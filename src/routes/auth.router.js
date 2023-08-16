import express from 'express';

import { authController } from '../controllers/index.js';
import { validationError, authValidation } from '../middleware/validation/index.js';

const router = express.Router();

router.post('/register', authValidation.validateRegister, validationError, authController.register);
router.post('/login', authValidation.validateLogin, validationError, authController.login);
router.post('/sendotp',authValidation. validateCheckEmail,validationError, authController.sendOTP);
router.post('/checkotp',authValidation. validateCheckEmail, validationError,authController.checkOTP);
router.post('/resetpass',authValidation.resetPassword, validationError, authController.resetPassword);
router.post('/forgetpass', authValidation.resetPassword, validationError,authController.forgetpass);
export default router;
