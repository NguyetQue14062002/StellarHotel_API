import asyncHandler from 'express-async-handler';
import { authRepository } from '../repositories/index.js';
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

const sendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userId = req.userId;
    await authRepository.sendOTP({ userId, email });
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Send OTP successfully.',
    });
});

const checkOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const userId = req.userId;
    const result = await authRepository.checkOTP({ userId, email, otp });
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Check OTP successfully.',
        data: result,
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { email, oldpass, newpass } = req.body;
    const userId = req.userId;
    const result = await authRepository.resetPassword(userId, email, oldpass, newpass);
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Reset Password successfully.',
        data: result,
    });
});

const forgetpass = asyncHandler(async (req, res) => {
    const { email, newpass } = req.body;
    const result = await authRepository.forgetPassword(email, newpass);
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Forget Password successfully.',
        data: result,
    });
});

export default { register, login, prefreshToken, logout, sendOTP, checkOTP, resetPassword, forgetpass };
