const mongoose = require('mongoose');
const { COLLECTION } = require('../../global/constants.js');

const accountInfoSchema = new mongoose.Schema({ 
    accountId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.ACCOUNT,
    },
    username:{
        type: String,
        required: true,
        default: "Anonymous",
        trim: true,
        validate: {
            validator: (name) => {
                return /^[\p{L}\s]*$/mu.test(name);
            },
            message: "Họ và tên là chuỗi chữ không chứa các ký tự đặt biệt."
        }
    },
    gender:{
        type: String,
        enum: {
            values: [DEFAULT_GENDER.MALE, DEFAULT_GENDER.FEMALE],
            massage: '{VALUE} is not supported'
        },
        required: true,
        default: DEFAULT_GENDER.MALE
    },
    nationality:{
        type: String,
        required: true,
        default: "Việt Nam",
        trim: true 
    },
    year:{
        type: Date,
    },
    phoneNumber:{
        type: String,
        required: true,
        validate: {
            validator: (phoneNumber) => {
                return /^\d{10}$/.test(phoneNumber);
            },
            message: 'Số điện thoại bao gồm 10 chữ số.'
        }
    },
},{
    timestamps: true,
});
module.exports = mongoose.model('AccountInfo', accountInfoSchema);