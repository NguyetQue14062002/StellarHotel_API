import express from 'express';
import { authController } from '../controllers/index.js';
import { validationError, authValidation } from '../middleware/validation/index.js';
import { verifyToken, isClient } from '../middleware/authMiddleware.js';

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
router.post(
    '/sendotp',
    authValidation.validateCheckEmail,
    validationError,
    verifyToken,
    isClient,
    authController.sendOTPresetPass,
);
router.post(
    '/checkotp',
    authValidation.validateCheckOTP,
    validationError,
    verifyToken,
    isClient,
    authController.checkOTPresetPass,
);
router.post(
    '/resetpass',
    authValidation.resetPassword,
    validationError,
    verifyToken,
    isClient,
    authController.resetPassword,
);
//forgot password
router.post(
    '/sendotp-forgotpass',
    authValidation.validateCheckEmail,
    validationError,
    authController.sendOTPforgotPass,
);
router.post(
    '/checkotp-forgotpass',
    authValidation.validateCheckOTP,
    validationError,
    authController.checkOTPforgotPass,
);
router.post('/forgetpass', authValidation.forgetpass, validationError, authController.forgetpass);

export default router;
