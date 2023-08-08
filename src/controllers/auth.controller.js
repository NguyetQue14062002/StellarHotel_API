import * as servies from '../services/auth.service.js';
import { validationResult } from 'express-validator';
import * as HttpStatusCode from '../exceptions/HttpStatusCode.js';
import {STATUS} from '../../global/constants.js';

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const {
        phoneNumer,
        email,
        password,
    } = req.body;

    try {
        await servies.register({phoneNumer, email, password});

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Đăng ký thành công.'
        })
    }catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};
