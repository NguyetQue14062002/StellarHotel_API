import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';

const register = async ({ email, password, phoneNumber }) => {
    let existingAccount = await userModel.findOne({ email });
    if (existingAccount) {
        throw new Exception(Exception.ACCOUNT_EXIST);
    }

    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
        // encrypted password, use bcrypt
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

        const newAccount = await userModel.create({
            email,
            password: hashPassword,
            phoneNumber,
        });

        if (!newAccount) {
            throw new Exception(Exception.CANNOT_REGISTER_ACCOUNT);
        }
    } else {
        throw new Exception(Exception.CANNOT_REGISTER_ACCOUNT);
    }
};

const login = async ({ email, password }) => {
    let existingAccount = await userModel.findOne({ email });
    if (!existingAccount) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    let isMatched = await bcrypt.compare(password, existingAccount.password);
    if (!isMatched) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    // Create a java web token
    let token = jwt.sign(
        {
            data: existingAccount,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1 days',
        },
    );

    return {
        id: existingAccount._id,
        userName: existingAccount.userName,
        yearOfBirth: existingAccount.yearOfBirth,
        gender: existingAccount.gender,
        nationality: existingAccount.nationality,
        email,
        phoneNumber: existingAccount.phoneNumber,
        token: token,
    };
};

const getAllUser = async ({ page, size, searchString }) => {
    const filterUser = await userModel.aggregate([
        {
            $match: {
                $or: [
                    {
                        email: { $regex: searchString, $options: 'i' },
                    },
                    {
                        userName: { $regex: searchString, $options: 'i' },
                    },
                    {
                        phoneNumber: { $regex: searchString, $options: 'i' },
                    },
                ],
            },
        },
        {
            $skip: (page - 1) * size,
        },
        {
            $limit: size,
        },
        {
            $project: {
                email: 1,
                userName: 1,
                phoneNumber: 1,
                gender: 1,
                nationality: 1,
                yearOfBirth: 1,
            },
        },
    ]);
    if (filterUser) {
        return filterUser;
    } else {
        throw new Exception(Exception.GET_USER_FAILED);
    }
};

export default { getAllUser, register, login };
