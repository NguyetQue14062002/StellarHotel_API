import { userModel, prefreshTokenModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import nodemailer from 'nodemailer';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async ({ email, password, phoneNumber }) => {
    let existingAccount = await userModel.findOne({ email });
    if (existingAccount) {
        throw new Exception(Exception.ACCOUNT_EXIST);
    }

    // encrypted password, use bcrypt
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    await userModel.create({
        email,
        password: hashPassword,
        phoneNumber,
    });
};

const login = async ({ email, password }) => {
    let existingAccount = await userModel.findOne({ email });
    if (!existingAccount) {
        printDebug('Email không hợp lệ!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    let isMatched = await bcrypt.compare(password, existingAccount.password);
    if (!isMatched) {
        printDebug('Mật khẩu không đúng!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    let hashRole = await bcrypt.hash(existingAccount.role, parseInt(process.env.SALT_ROUNDS));

    // Create a java web token
    let accessToken = jwt.sign(
        {
            user: {
                userId: existingAccount.id,
                role: hashRole,
            },
        },
        process.env.JWT_SECRET_ACCESS,
        {
            expiresIn: '1h',
        },
    );

    let prefreshToken = jwt.sign(
        {
            user: {
                userId: existingAccount.id,
                role: hashRole,
            },
        },
        process.env.JWT_SECRET_PREFRESH,
        {
            expiresIn: '1 days',
        },
    );

    await prefreshTokenModel.findOneAndDelete({ userId: existingAccount.id });
    await prefreshTokenModel.create({ userId: existingAccount.id, prefreshToken }).catch((exception) => {
        printDebug('Không tạo được prefreshToken', OutputTypeDebug.INFORMATION);
        printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
        throw new Exception(Exception.LOGIN_FAILED);
    });

    return {
        accessToken,
        prefreshToken,
    };
};

const prefreshToken = async ({ userId, token }) => {
    const existingPrefreshToken = await prefreshTokenModel.findOne({ userId, prefreshToken: token }).exec();
    if (!existingPrefreshToken) {
        throw new Exception(Exception.USER_NOT_AUTHORIZED_OR_TOKEN_MISSING);
    }

    let accessToken;
    jwt.verify(existingPrefreshToken.prefreshToken, process.env.JWT_SECRET_PREFRESH, (err, decoded) => {
        if (err || !decoded.user) {
            printDebug('Xác thực prefreshToken không thành công!', OutputTypeDebug.INFORMATION);
            throw new Exception(Exception.USER_NOT_AUTHORIZED_OR_TOKEN_MISSING);
        }
        accessToken = jwt.sign(
            {
                user: decoded.user,
            },
            process.env.JWT_SECRET_ACCESS,
            {
                expiresIn: '1h',
            },
        );
    });

    return {
        accessToken,
    };
};

const logout = async ({ userId }) => {
    await prefreshTokenModel.findOneAndDelete({ userId }).catch((exception) => {
        printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
        throw new Exception(Exception.LOGOUT_FAILED);
    });
};

//Reset password
const sendOTPresetPass = async ({ userId, email }) => {
    const filterUser = await userModel.findById({ _id: userId });
    if (filterUser.email != email) {
        printDebug('Email không hợp lệ!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.INVALID_EMAIL);
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    //send mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'nguyetque65697@gmail.com',
            pass: 'kfsxdgbvewakanjq',
        },
    });
    let mailOptions = {
        from: 'nguyetquepham7@gmail.com',
        to: email,
        subject: 'Xác thực người dùng',
        html: `<h1>Xác thực người dùng</h1>
                    <p>OTP xác thực người dùng của bạn là: ${otp},  có hiệu lực trong vòng 1 phút.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            printDebug(error, OutputTypeDebug.ERROR);
        } else {
            printDebug('Email sent: ' + info.response, OutputTypeDebug.INFORMATION);
        }
    });
    await userModel.findByIdAndUpdate(filterUser._id, {
        otp: otp,
    });
    return Exception.SEND_OTP_SUCCESS;
};

const checkOTPresetPass = async ({ userId, email, otp }) => {
    const user = await userModel.findById({ _id: userId });
    if (user.email == email && user.otp == otp) {
        await userModel.updateOne({ _id: user._id }, { $set: { otp: null } });
        return Exception.OTP_CORRECT;
    }
    if (user.otp == null) {
        throw new Exception(Exception.OTP_INCORRECT);
    }
    throw new Exception(Exception.INVALID_EMAIL);
};

const resetPassword = async (userId, email, oldpass, newpass) => {
    const hashPassword = await bcrypt.hash(newpass, parseInt(process.env.SALT_ROUNDS));
    const user = await userModel.findById({ _id: userId });
    if (user.email != email) {
        printDebug('Email không hợp lệ!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.INVALID_EMAIL);
    }
    let isMatched = await bcrypt.compare(oldpass, user.password);
    if (!isMatched) {
        printDebug('Mật khẩu không đúng!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.INCORRECT_PASS);
    }
    await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
    return Exception.CHANGED_PASSWORD_SUCCESS;
};

//forgot password
const sendOTPforgotPass = async ({ email }) => {
    const filterUser = await userModel.findOne({ email });
    if (!filterUser) {
        printDebug('Email không hợp lệ!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.INVALID_EMAIL);
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    //send mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'nguyetque65697@gmail.com',
            pass: 'kfsxdgbvewakanjq',
        },
    });
    let mailOptions = {
        from: 'nguyetquepham7@gmail.com',
        to: email,
        subject: 'Xác thực người dùng',
        html: `<h1>Xác thực người dùng</h1>
                    <p>OTP xác thực người dùng của bạn là: ${otp},  có hiệu lực trong vòng 1 phút.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            printDebug(error, OutputTypeDebug.ERROR);
        } else {
            printDebug('Email sent: ' + info.response, OutputTypeDebug.INFORMATION);
        }
    });
    await userModel.findByIdAndUpdate(filterUser._id, {
        otp: otp,
    });
    return Exception.SEND_OTP_SUCCESS;
};

const checkOTPforgotPass = async ({ email, otp }) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Exception(Exception.INVALID_EMAIL);
    }

    if (user.otp == null) {
        printDebug('Yêu cầu người dùng send otp', OutputTypeDebug.INFORMATION);
        throw new Exception('Yêu cầu người dùng send otp');
    }

    if (user.otp != otp) {
        printDebug('otp không hợp lệ', OutputTypeDebug.INFORMATION);
        throw new Exception('otp không hợp lệ');
    }
};
const forgetPassword = async (email, newpass) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        printDebug('Email không hợp lệ!', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.INVALID_EMAIL);
    } else {
        const hashPassword = await bcrypt.hash(newpass, parseInt(process.env.SALT_ROUNDS));
        await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
        return Exception.CHANGED_PASSWORD_SUCCESS;
    }
};

export default {
    register,
    login,
    prefreshToken,
    logout,
    sendOTPresetPass,
    checkOTPresetPass,
    resetPassword,
    sendOTPforgotPass,
    checkOTPforgotPass,
    forgetPassword,
};
