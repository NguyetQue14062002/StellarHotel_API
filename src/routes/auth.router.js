import express from 'express';

import { authController } from '../controllers/index.js';
import { validationError, authValidation } from '../middleware/validation/index.js';

const router = express.Router();

router.post('/register', authValidation.validateRegister, validationError, authController.register);
router.post('/login', authValidation.validateLogin, validationError, authController.login);
router.post('/prefresh-token', authValidation.validatePrefreshToken, validationError, authController.prefreshToken);
router.post('/logout', authController.logout);
router.post('/sendotp', authController.sendOTP);
router.post('/checkotp', authController.checkOTP);
router.post('/resetpass', authController.resetPassword);
router.post('/forgetpass', authController.forgetpass);
export default router;
