import { body } from 'express-validator';
import isEmail from 'validator/lib/isEmail.js';

import Exception from '../../exceptions/Exception.js';

const validateRegister = [
    body('email')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return isEmail(value);
        })
        .withMessage(Exception.INVALID_EMAIL),
    body('password')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value);
        })
        .withMessage(Exception.INVALID_PASSWORD),
    body('phoneNumber')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return /^\d{10}$/.test(value);
        })
        .withMessage(Exception.INVALID_PHONENUMBER),
];

const validateLogin = [
    body('email')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return isEmail(value);
        })
        .withMessage(Exception.INVALID_EMAIL),
    body('password')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value);
        })
        .withMessage(Exception.INVALID_PASSWORD),
];

export default { validateRegister, validateLogin };
