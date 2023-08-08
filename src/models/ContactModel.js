const mongoose = require('mongoose');
const { COLLECTION } = require('../global/../constants.js');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        validate: {
            validator: (phoneNumber) => {
                return /^\d{10}$/.test(phoneNumber);
            },
            message: 'Số điện thoại bao gồm 10 chữ số.'
        }
    },
    message:{
        type: String,
        required: true,

    }
    },{
    timestamps: true,
});
module.exports = mongoose.model('Contact', contactSchema);