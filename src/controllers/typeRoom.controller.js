import { typeRoomRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';
import {v2 as cloudinary} from 'cloudinary';

const filterTypeRooms = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const existingTypeRooms = await typeRoomRepository.filterTypeRooms({ page, size, searchString });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get the successful room type list!',
            data: existingTypeRooms,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
const updateTypeRoom = async (req, res) => {
    const {files} = req;
    const link_img = files.map((file) => file.path);
    const { idTypeRoom } = req.body;
    try {
        const result = await typeRoomRepository.updateTypeRoom(
            idTypeRoom,
            link_img
        );
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update type room successfully.',
            data: result,
        });
    }catch (exception) {
        try {
            for (const file of files) {
                await cloudinary.uploader.destroy(
                    file.filename,
                    { invalidate: true, resource_type: "image" }
                );
            }
        } catch (error) {
            console.log(error);
        }
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
}

export default { filterTypeRooms, updateTypeRoom };
