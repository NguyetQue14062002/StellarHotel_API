import mongoose from 'mongoose';
import { URL_ROOM_DEFAULT } from '../global/constants.js';

const utilitiesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
            default: URL_ROOM_DEFAULT
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            currentTime: () => new Date().getTime(),
        },
    },
);

export default mongoose.model('Utilities', utilitiesSchema);
