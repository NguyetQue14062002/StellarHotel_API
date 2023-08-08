import  {userModel} from'../models/index.js';
import Exception from '../exceptions/Exception.js';
import nodemailer from 'nodemailer';

const sendOTP = (email) => new Promise( async(resolve, reject) => {
    try {
        const user = await userModel.findOne({
            where: { email }
        });

        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000);
            //send mail
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: "nguyetque65697@gmail.com",
                    pass: "kfsxdgbvewakanjq"
                }
            });
            let mailOptions = {
                from: "nguyetquepham7@gmail.com",
                to: email,
                subject: 'Xác thực người dùng',
                html: `<h1>Xác thực người dùng</h1>
                    <p>OTP xác thực người dùng của bạn là: ${otp}</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            await userModel.updateOne({
                otp
            }, {
                where: { id: userModel.id }
            });
            resolve({
                err: 0,
                message: 'OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và điền OTP vào ô bên dưới để xác thực người dùng!'
            });
        }
        else {
            resolve({
                err: -1,
                message: 'Email này chưa đăng ký tài khoản!'
            });
        }
    }
    catch (error) {
        reject(error);
    }
});
export default {sendOTP};