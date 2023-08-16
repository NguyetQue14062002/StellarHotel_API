import { roomRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';
import {v2 as cloudinary} from 'cloudinary';



const filterNumberAvailableRooms = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { typeRoom } = req.query;

    try {
        const existingRooms = await roomRepository.filterNumberAvailableRooms({ typeRoom });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get the successful room list!',
            data: existingRooms,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

const addRoom = async (req, res) => {
    const link_img= req.file?.path;
    
    const { idTypeRoom,  acreage, typeBed, capacity, view, prices, status } = req.body;
    try {
        const result = await roomRepository.addRoom(
            idTypeRoom,
            link_img,
            acreage,
            typeBed,
            capacity,
            view,
            prices,
            status,
        );
      res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Add Room successfully.',
            data: result,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }

};

const updateRoom = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { name, roomNumber, image, acreage, typeBed, capacity, view, prices, status } = req.body;
    try {
        const result = await roomRepository.updateRoom(
            name,
            roomNumber,
            image,
            acreage,
            typeBed,
            capacity,
            view,
            prices,
            status,
        );
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update Room successfully.',
            data: result,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};



export default { addRoom, updateRoom, filterNumberAvailableRooms };
