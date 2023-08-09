import { authServices } from '../services/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';

const sendOTP = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
        const result = await authServices.sendOTP(email);
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
        const result = await authServices.checkOTP(email, otp);
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
        const result = await authServices.resetPassword(email, oldpass, newpass);
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
        const result = await authServices.forgetPassword(email, newpass);
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
export default { sendOTP, checkOTP, resetPassword, forgetpass };
