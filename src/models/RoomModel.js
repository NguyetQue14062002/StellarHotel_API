const mongoose = require('mongoose');
const { COLLECTION } = require('../global/../constants.js');

const roomSchema = new mongoose.Schema({
    roomNumber:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        emun:{
            values: [DEFAULT_ROOM_TYPE.SuperiorDoubleOrTwin, DEFAULT_ROOM_TYPE.DeluxeDouble, DEFAULT_ROOM_TYPE.ExecutiveCityView, DEFAULT_ROOM_TYPE.SuiteGarden],
            massage: '{VALUE} is not supported'
        },
        required: true,
        default: DEFAULT_ROOM_TYPE.SuperiorDoubleOrTwin
    },
    acreage:{
        type: Number,
    },
    beadType:{
        type: String,
        emun:{
            values: [DEFAULT_BEAD_TYPE.Double, DEFAULT_BEAD_TYPE.Single],
            massage: '{VALUE} is not supported'
        },
        required: true,
        default: DEFAULT_BEAD_TYPE.Double
    },
    capacity:{
        type: String,
        required: true,
        default: '02 Người lớn',
    },
    view:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
    price:{
        type: Float32Array,
        required: true,
        default: 0,
    },
    status:{
        type: String,
        emun:{
            values: [DEFAULT_ROOM_STATUS.Available, DEFAULT_ROOM_STATUS.Booked, DEFAULT_ROOM_STATUS.Used],
            massage: '{VALUE} is not supported'
        },
        required: true,
        default: DEFAULT_ROOM_STATUS.Available
    },}
    ,{
    timestamps: true,
});
module.exports = mongoose.model('Room', roomSchema);