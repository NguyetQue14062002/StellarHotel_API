import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';

export default class Exception extends Error {
    static USER_NOT_AUTHORIZED_OR_TOKEN_MISSING = 'User is not authorized or token is missing!';
    static INVALID_EMAIL = 'Invalid email';
    static INVALID_PASSWORD =
        'Password must be at least 8 characters. Includes uppercase, lowercase letters and numbers.';
    static INVALID_USERNAME = 'First and last name is a string of letters that do not contain special characters.';
    static INVALID_PHONENUMBER = 'Phone number consists of 10 digits.';
    static INVALID_TYPE_ROOM = 'Invalid type of room';
    static INVALID_CHECKIN_DATE = 'Invalid checkin date';
    static INVALID_CHECKOUT_DATE = 'Invalid checkout date';
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
    static WRONG_DB_CONNECTION_STRING = 'Wrong server name connection string';
    static CANNOT_CONECT_MONGODB = "Can't connect to Mongoose";

    static GET_USER_FAILED = 'Get user failed';
    static SEND_OTP_SUCCESS =
        'OTP has been sent to your email. Please check and enter OTP in the box below to authenticate the user!';
    static OTP_CORRECT = 'OTP is correct';
    static OTP_INCORRECT = 'OTP is incorrect';
    static OTP_EXPIRED = 'OTP is expired';
    static CHANGED_PASSWORD_SUCCESS = 'You have successfully changed your password';
    static INCORRECT_PASS = 'Incorrect password';

    static ACCOUNT_EXIST = 'Account already exists';
    static CANNOT_REGISTER_ACCOUNT = "Can't register Account";
    static WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password';
    static LOGIN_FAILED = 'Login failed';
    static LOGOUT_FAILED = 'Logout failed';
    static UPDATE_USER_FAILED = 'User information update failed';
    static GET_USER_FAILED = 'Get user failed';
    static DELETE_USER_FAILED = 'Delete user failed';
    static DELETE_USER_SUCCESS = 'Delete user successfully';
    static BOOKING_FAILED = 'Booking failed';

    static DATA_RETRIEVAL_FAILED = 'Data retrieval failed';
    static TYPE_ROOM_NOT_EXIST = 'Type room not exist';
    static ROOM_EXIST = 'Room exist';
    static GET_NUMBER_AVAILABLE_ROOMS_FAILED = 'Retrieve list of available rooms failed';
    static CREATE_ROOM_FAILED = "Can't create room";
    static CANNOT_ADD_ROOM = "Can't add room";

    static CANNOT_UPDATE_ROOM = "Can't update room";

    static UTILITIES_NOT_EXIST = 'Utilities not exist';
    static UTILITIES_EXIST = 'Utilities already exists';
    static CREATE_UTILITIES_ERROR = "Can't create utilities";
    static DELETE_UTILITIES_SUCCESS = 'Delete utilities successfully';
    constructor(message, validatorErrors = {}) {
        super(message); // call constructor of parent class(Error)
        printDebug(message, OutputTypeDebug.ERROR);
        this.validatorErrors = validatorErrors;
    }
}
