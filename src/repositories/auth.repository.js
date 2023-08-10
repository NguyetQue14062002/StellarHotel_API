import { userModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import nodemailer from 'nodemailer';
import { OutputType, print } from '../helpers/print.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import e from 'cors';

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

const sendOTP = async (email) => {
    try {
        const filterUser = await userModel.findOne({ email });
        if (!filterUser) {
            return Exception.INVALID_EMAIL;
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
                    <p>OTP xác thực người dùng của bạn là: ${otp}, có hiệu lực trong vòng 1 phút.</p>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                print(error, OutputType.ERROR);
            } else {
                print('Email sent: ' + info.response, OutputType.INFORMATION);
            }
        });
        await userModel.findByIdAndUpdate(filterUser._id, {
            otp: otp,
        });
        if (filterUser.otp !== 0) {
            setTimeout(async () => {
                await userModel.findByIdAndUpdate(filterUser._id, {
                    otp: 0,
                });
                console.log('OTP updated to 0');
            }, 60000);
        }
        return Exception.SEND_OTP_SUCCESS;
    } catch (error) {
        print(error, OutputType.ERROR);
    }
};

const checkOTP = async (email, otp) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return Exception.INVALID_EMAIL;
        } else {
            if (user.otp == otp && user.role == 'client') {
                await userModel.findByIdAndUpdate(user._id, { otp: 0 });
                return Exception.OTP_CORRECT;
            } else {
                return Exception.OTP_INCORRECT;
            }
        }
    } catch (error) {
        print(error, OutputType.ERROR);
    }
};

const resetPassword = async (email, oldpass, newpass) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return Exception.INVALID_EMAIL;
        } else {
            let isMatched = await bcrypt.compare(oldpass, user.password);
            const hashPassword = await bcrypt.hash(newpass, parseInt(process.env.SALT_ROUNDS));
            if (!isMatched) {
                return Exception.INCORRECT_PASS;
            } else {
                if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(newpass)) {
                    await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
                    return Exception.CHANGED_PASSWORD_SUCCESS;
                }
                return Exception.INVALID_PASSWORD;
            }
        }
    } catch (error) {
        print(error, OutputType.ERROR);
    }
};
const forgetPassword = async (email, newpass) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return Exception.INVALID_EMAIL;
        } else {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(newpass)) {
                const hashPassword = await bcrypt.hash(newpass, parseInt(process.env.SALT_ROUNDS));
                await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
                return Exception.CHANGED_PASSWORD_SUCCESS;
            } else {
                return Exception.INVALID_PASSWORD;
            }
        }
    } catch (error) {
        print(error, OutputType.ERROR);
    }
};

export default { register, login, sendOTP, checkOTP, resetPassword, forgetPassword };
