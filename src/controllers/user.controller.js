import { userServices } from '../services/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, password, phoneNumber } = req.body;

    try {
        await userServices.register({ email, password, phoneNumber });

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Register Account successfully',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingAccount = await userServices.login({ email, password });
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Login successfully',
            data: existingAccount,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, userName, phoneNumber, gender, nationality, yearOfBirth } = req.body;
};

const getAllUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size > MAX_RECORDS ? MAX_RECORDS : size;
    try {
        const filterUser = await userServices.getAllUser({ page, size, searchString });
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get the list of successful users.',
            data: filterUser,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
export default { register, login, updateUser, getAllUser };
