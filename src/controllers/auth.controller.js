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

export default { sendOTP };
