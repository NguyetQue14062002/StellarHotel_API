import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { OutputType, print } from '../helpers/print.js';

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
            expiresIn: '60 days',
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

const updateUser = async ({ id, email, userName, phoneNumber, gender, nationality, yearOfBirth }) => {
    let existingUser = await userModel.findById(id);
    if (!existingUser) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    // Update information user
    existingUser.email = email ?? existingUser.email;
    existingUser.userName = userName ?? existingUser.userName;
    existingUser.phoneNumber = phoneNumber ?? existingUser.phoneNumber;
    existingUser.gender = gender ?? existingUser.gender;
    existingUser.nationality = nationality ?? existingUser.nationality;
    existingUser.yearOfBirth = yearOfBirth ?? existingUser.yearOfBirth;
    await existingUser.save().catch((exception) => {
        print(`${exception.message}`, OutputType.ERROR);
        throw new Exception(Exception.UPDATE_USER_FAILED);
    });

    return {
        id: existingUser._id,
        userName: existingUser.userName,
        yearOfBirth: existingUser.yearOfBirth,
        gender: existingUser.gender,
        nationality: existingUser.nationality,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
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

export default { getAllUser, register, login, updateUser };
