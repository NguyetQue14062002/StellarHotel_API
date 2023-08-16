import asyncHandler from 'express-async-handler';
import { authRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';

const register = asyncHandler(async (req, res) => {
    const { email, password, phoneNumber } = req.body;

    await authRepository.register({ email, password, phoneNumber });

    res.status(HttpStatusCode.INSERT_OK).json({
        status: STATUS.SUCCESS,
        message: 'Register Account successfully',
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingAccount = await authRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Login successfully',
        data: existingAccount,
    });
});

const prefreshToken = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const userId = req.userId;

    const prefreshToken = await authRepository.prefreshToken({ userId, token });

    res.status(HttpStatusCode.INSERT_OK).json({
        status: STATUS.SUCCESS,
        message: 'Refresh Token successfully',
        data: prefreshToken,
    });
});

const logout = asyncHandler(async (req, res) => {
    const userId = req.userId;
    await authRepository.logout({ userId });

    res.status(HttpStatusCode.INSERT_OK).json({
        status: STATUS.SUCCESS,
        message: 'Logout successfully',
    });
});

const sendOTP = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
        const result = await authRepository.sendOTP(email);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Send OTP successfully.',
            data: result,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const checkOTP = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, otp } = req.body;
    try {
        const result = await authRepository.checkOTP(email, otp);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Check OTP successfully.',
            data: result,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
const resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, oldpass, newpass } = req.body;
    try {
        const result = await authRepository.resetPassword(email, oldpass, newpass);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Reset Password successfully.',
            data: result,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
const forgetpass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, newpass } = req.body;
    try {
        const result = await authRepository.forgetPassword(email, newpass);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Forget Password successfully.',
            data: result,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
export default { register, login, prefreshToken, logout, sendOTP, checkOTP, resetPassword, forgetpass };
