import {accountModel, accountInfoModel} from '../models/index.js';
import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';
//import AccountInfoModel from '../models/AccountInfoModel';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
export const register = async ({phoneNumber, email, password}) => {
   let existingUser = await accountModel.findOne({email}).exec();
    if(existingUser){
        throw new Error('Email đã tồn tại.');
    } 
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)){
        const hash = hashPassword(password);
        const newAccount = await accountModel.create({
            email,
            password: hash,
        });
        if(newAccount){
            const newAccountInfo = await accountInfoModel.create({
                accountId: newAccount._id,
                phoneNumber,
             });
             if (newAccountInfo){
                 return newAccountInfo;
             }
             else{
                await accountModel.findByIdAndDelete(newAccount._id);
                throw new Error('Đăng ký thất bại.');
            }
        }else{
            throw new Error('Đăng ký thất bại.');
        }  
    }
    else{
        throw new Error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.');
    }
};