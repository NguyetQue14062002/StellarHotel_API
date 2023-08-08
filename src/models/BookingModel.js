const mongoose = require('mongoose');
const { COLLECTION } = require('../../global/constants.js');

const bookingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.ACCOUNT,
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.ROOM,
    },
    quantity:{
        type: Number,
        required: true,
        default: 1,
    },
    checkIn:{
        type: Date,
        required: true,
    } ,
    checkOut:{
        type: Date,
        required: true,
    },
    price:{
        type: Float32Array,
        required: true,
        default: 0,
    },
    status:{
        type: String,
        emun:{
            values: [DEFAULT_BOOKING_STATUS.Complete, DEFAULT_BOOKING_STATUS.Canceled],
            massage: '{VALUE} is not supported' 
        },
        required: true,
        default: DEFAULT_BOOKING_STATUS.Complete
    },
    },{
    timestamps: true,
});
module.exports = mongoose.model("Booking", bookingSchema);
