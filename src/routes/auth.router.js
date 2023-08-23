import express from 'express';

import { authController } from '../controllers/index.js';
import { validationError, authValidation } from '../middleware/validation/index.js';
import { verifyToken, isAdmin, isClient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authValidation.validateRegister, validationError, authController.register);
router.post('/login', authValidation.validateLogin, validationError, authController.login);
router.post(
    '/prefresh-token',
    authValidation.validatePrefreshToken,
    validationError,
    verifyToken,
    authController.prefreshToken,
);
router.post('/logout', verifyToken, authController.logout);
//reset password
router.post('/sendotp', verifyToken, isClient,  authValidation.validateCheckEmail, validationError, authController.sendOTPresetPass);
router.post('/checkotp', verifyToken, isClient, authValidation.validateCheckEmail, validationError, authController.checkOTPresetPass);
router.post('/resetpass', verifyToken, isClient, authValidation.resetPassword, validationError, authController.resetPassword);
//forgot password
router.post('/sendotp-forgotpass', authValidation.validateCheckEmail, validationError, authController.sendOTPforgotPass);
router.post('/checkotp-forgotpass',  authValidation.validateCheckEmail, validationError, authController.checkOTPforgotPass);
router.post('/forgetpass', authValidation.resetPassword, validationError, authController.forgetpass);

export default router;
