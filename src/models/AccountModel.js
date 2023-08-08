const mongoose = require('mongoose');
const { COLLECTION } = require('../../global/constants.js');

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        default: "Anonymous@gmail.com",
        validate: {
            validator: (email) => {
                isEmail
            },
            message: "Email không hợp lệ."
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
            },
            message: "Mật khẩu phải tối thiểu 8 ký tự. Bao gồm chữ cái in hoa, in thường và chữ số."
        }
    },
    role:{
        type: String,
        enum:{
            values: [DEFAULT_ROLE.CLIENT, DEFAULT_ROLE.ADMIN],
        },
        required: true,
        default: DEFAULT_ROLE.CLIENT,
    }
    },{
        timestamps: true
    });
module.exports = mongoose.model('Account', accountSchema);