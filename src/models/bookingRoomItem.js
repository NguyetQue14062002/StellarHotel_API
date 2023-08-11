import mongoose from 'mongoose';

import { STATUS_BOOKING, COLLECTION } from '../global/constants.js';

const bookingRoomItemSchema = new mongoose.Schema(
    {
        bookingRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: COLLECTION.BOOKING_ROM,
        },
        typeRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: COLLECTION.TYPE_ROOMS,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('BookingRoomItems', bookingRoomItemSchema);
