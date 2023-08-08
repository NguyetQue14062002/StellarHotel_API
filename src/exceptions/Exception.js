import { OutputType, print } from '../helpers/print.js';

export default class Exception extends Error {
    static INVALID_EMAIL = 'Invalid email';
    static INVALID_PASSWORD =
        'Password must be at least 8 characters. Includes uppercase, lowercase letters and numbers.';
    static INVALID_USERNAME = 'First and last name is a string of letters that do not contain special characters.';
    static INVALID_PHONENUMBER = 'Phone number consists of 10 digits.';
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
    static WRONG_DB_CONNECTION_STRING = 'Wrong server name connection string';
    static CANNOT_CONECT_MONGODB = "Can't connect to Mongoose";

    constructor(message, validatorErrors = {}) {
        super(message); // call constructor of parent class(Error)
        print(message, OutputType.ERROR);
        this.validatorErrors = validatorErrors;
    }
}
