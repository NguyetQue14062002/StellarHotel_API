import mongoose from 'mongoose';

import { STATUS_BOOKING } from '../global/constants.js';

const bookingRoomSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        checkin_date: {
            type: Date,
            required: true,
        },
        checkout_date: {
            type: Date,
            required: true,
        },
        totalprice: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            enum: {
                values: [STATUS_BOOKING.BOOKED, STATUS_BOOKING.CANCELLEDFEMALE],
                message: '{VALUE} is not supported',
            },
            default: STATUS_BOOKING.BOOKED,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('BookingRooms', bookingRoomSchema);
