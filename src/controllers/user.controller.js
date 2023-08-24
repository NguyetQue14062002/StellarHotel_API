import { userRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';
import asyncHandler from 'express-async-handler';

//Admin
const getAllUser = asyncHandler(async (req, res) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    const filterUser = await userRepository.getAllUser({ page, size, searchString });

    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get the list of successful users.',
        data: filterUser,
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const { id, email, userName, phoneNumber, gender, nationality, yearOfBirth } = req.body;

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
});

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

export default { getAllUser, updateUser, updateProfile, getUser, deleteUser };
