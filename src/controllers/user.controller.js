import { userRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';
import asyncHandler from 'express-async-handler';

//Client
const getUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const userId = req.userId;
    try {
        const user = await userRepository.getUser(userId);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get user information successfully!',
            data: user,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, userName, phoneNumber, gender, nationality, yearOfBirth } = req.body;
    const id = req.userId;

    try {
        const existingUser = await userRepository.updateProfile({
            id,
            email,
            userName,
            phoneNumber,
            gender,
            nationality,
            yearOfBirth,
        });
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update user information successfully!',
            data: existingUser,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

//Admin
const getAllUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const filterUser = await userRepository.getAllUser({ page, size, searchString });
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
const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { id, email, userName, phoneNumber, gender, nationality, yearOfBirth } = req.body;

    try {
        const existingUser = await userRepository.updateUser({
            id,
            email,
            userName,
            phoneNumber,
            gender,
            nationality,
            yearOfBirth,
        });
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update user information successfully!',
            data: existingUser,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { id } = req.body;
    try {
        const existingUser = await userRepository.deleteUser(id);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete user successfully!',
            data: existingUser,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const getTransactionHistory = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const existingUser = await userRepository.getTransactionHistory;
    ({ userId });
});

export default { updateProfile, getUser, getAllUser, updateUser, deleteUser, getTransactionHistory };
