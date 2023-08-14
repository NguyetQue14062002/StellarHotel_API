import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

import Exception from '../exceptions/Exception.js';
import { DEFAULT_ROLES, DEFAULT_GENDER } from '../global/constants.js';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (email) => {
                    isEmail;
                },
                message: Exception.INVALID_EMAIL,
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (password) => {
                    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
                },
                message: Exception.INVALID_PASSWORD,
            },
        },
        role: {
            type: String,
            enum: {
                values: [DEFAULT_ROLES.CLIENT, DEFAULT_ROLES.MANAGER],
                massage: '{VALUE} is not supported',
            },
            required: true,
            default: DEFAULT_ROLES.CLIENT,
        },
        userName: {
            type: String,
            required: true,
            default: 'Anonymous',
            trim: true,
            validate: {
                validator: (name) => {
                    return /^[\p{L}\s]*$/mu.test(name);
                },
                message: Exception.INVALID_USERNAME,
            },
        },
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: (phoneNumber) => {
                    return /^\d{10}$/.test(phoneNumber);
                },
                message: Exception.INVALID_PHONENUMBER,
            },
        },
        gender: {
            type: String,
            enum: {
                values: [DEFAULT_GENDER.MALE, DEFAULT_GENDER.FEMALE],
                message: '{VALUE} is not supported',
            },
        },
        nationality: {
            type: String,
        },
        yearOfBirth: {
            type: Number,
        },
        otp: {
            type: Number,
            index: true,
        },
    },
    {
        timestamps: {
            currentTime: () => new Date().getTime(),
        },
    },
);

userSchema.index({ otp: 1 }, { expireAfterSeconds: 60 });

export default mongoose.model('Users', userSchema);
