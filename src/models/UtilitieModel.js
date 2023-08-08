const mongoose = require('mongoose');
const { COLLECTION } = require('../../global/constants.js');

const utilitieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    description:{
        type: String,
        required: true,
    },
    },{
    timestamps: true,
    });
module.exports = mongoose.model("Utilitie", utilitieSchema);