import {roomRepository} from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';

const addRoom = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { idTypeRoom, roomNumber, image, acreage, typeBed, capacity, view, prices,status } = req.body;
    try{
        const result = await roomRepository.addRoom(idTypeRoom, roomNumber, image, acreage, typeBed, capacity, view, prices,status);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Add Room successfully.',
            data: result,
        });
    }catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }

} ;
const updateRoom = async (req, res) => {   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const {  name, roomNumber, image, acreage, typeBed, capacity, view, prices,status } = req.body;
    try{
        const result = await roomRepository.updateRoom(name, roomNumber, image, acreage, typeBed, capacity, view, prices,status);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update Room successfully.',
            data: result,
        });
    }catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
}

export default { addRoom, updateRoom };