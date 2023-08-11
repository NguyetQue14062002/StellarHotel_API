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

    static GET_USER_FAILED = 'Get user failed';
    static SEND_OTP_SUCCESS =
        'OTP has been sent to your email. Please check and enter OTP in the box below to authenticate the user!';
    static OTP_CORRECT = 'OTP is correct';
    static OTP_INCORRECT = 'OTP is incorrect';
    static CHANGED_PASSWORD_SUCCESS = 'You have successfully changed your password';
    static INCORRECT_PASS = 'Incorrect password';

    static ACCOUNT_EXIST = 'Account already exists';
    static CANNOT_REGISTER_ACCOUNT = "Can't register Account";
    static WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password';
    static GET_USER_FAILED = 'Get user failed';
    static UPDATE_USER_FAILED = 'User information update failed';

    static DATA_RETRIEVAL_FAILED = 'Data retrieval failed';
    static TYPE_ROOM_NOT_EXIST = 'Type room not exist';
    static CANNOT_ADD_ROOM = "Can't add room";
    constructor(message, validatorErrors = {}) {
        super(message); // call constructor of parent class(Error)
        print(message, OutputType.ERROR);
        this.validatorErrors = validatorErrors;
    }
}
