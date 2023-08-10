import mongoose from 'mongoose';

import Exception from '../exceptions/Exception.js';
import { URL_ROOM_DEFAULT, TYPE_BED, ROOM_STATUS, COLLECTION } from '../global/constants.js';

const roomSchema = new mongoose.Schema(
    {
        typeRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: COLLECTION.TYPE_ROOMS,
        },
        roomNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
            default: URL_ROOM_DEFAULT,
        },
        description: {
            type: mongoose.Schema.Types.ObjectId,
            ref: COLLECTION.DESCRIPTION_ROOM,
        },
        acreage: {
            type: Number,
            required: true,
        },
        typeBed: {
            type: String,
            required: true,
            enum: {
                values: [TYPE_BED.SINGLE_BED, TYPE_BED.DOUBLE_BED],
                massage: '{VALUE} is not supported',
            },
        },
        capacity: {
            type: String,
            required: true,
            default: '2 người lớn',
        },
        view: {
            type: String,
        },
        prices: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: [ROOM_STATUS.AVAILABLE, ROOM_STATUS.BOOKED, ROOM_STATUS.USING],
                massage: '{VALUE} is not supported',
            },
            default: ROOM_STATUS.AVAILABLE,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Rooms', roomSchema);
