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
router.post(
    '/sendotp',
    authValidation.validateCheckEmail,
    validationError,
    verifyToken,
    isClient,
    authController.sendOTP,
);
router.post(
    '/checkotp',
    authValidation.validateCheckEmail,
    validationError,
    verifyToken,
    isClient,
    authController.checkOTP,
);
router.post(
    '/resetpass',
    authValidation.resetPassword,
    validationError,
    verifyToken,
    isClient,
    authController.resetPassword,
);
router.post('/forgetpass', authValidation.resetPassword, validationError, authController.forgetpass);

export default router;
