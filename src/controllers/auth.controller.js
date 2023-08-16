import asyncHandler from 'express-async-handler';
import { authRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';

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

const sendOTP = asyncHandler (async (req, res) => {
    const { email } = req.body;
   
    const result = await authRepository.sendOTP(email);
     res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Send OTP successfully.',
            data: result,
        });
});

const checkOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
        const result = await authRepository.checkOTP(email, otp);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Check OTP successfully.',
            data: result,
        });
});
const resetPassword = asyncHandler(async (req, res) => { 
    const { email, oldpass, newpass } = req.body;
        const result = await authRepository.resetPassword(email, oldpass, newpass);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Reset Password successfully.',
            data: result,
        });
});
const forgetpass = async (req, res) => {
    const { email, newpass } = req.body;
        const result = await authRepository.forgetPassword(email, newpass);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Forget Password successfully.',
            data: result,
        });
    
};
export default { register, login, sendOTP, checkOTP, resetPassword, forgetpass };
