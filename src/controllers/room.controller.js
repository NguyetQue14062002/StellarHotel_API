import asyncHandler from 'express-async-handler';
import { roomRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';
import { dateTimeInputFormat, DateStrFormat } from '../helpers/timezone.js';
import { printDebug, OutputTypeDebug } from '../helpers/printDebug.js';

const getNumberAvailableRooms = asyncHandler(async (req, res) => {
    const typeRoom = req.query.typeRoom;
    const checkinDate = dateTimeInputFormat(req.query.checkinDate + ' 12:00', DateStrFormat.DATE_AND_TIME);
    const checkoutDate = dateTimeInputFormat(req.query.checkoutDate + ' 12:00', DateStrFormat.DATE_AND_TIME);
    printDebug(`checkinDate format: ${checkinDate}`, OutputTypeDebug.INFORMATION);
    printDebug(`checkoutDate format: ${checkoutDate}`, OutputTypeDebug.INFORMATION);

    const existingRooms = await roomRepository.getNumberAvailableRooms({ typeRoom, checkinDate, checkoutDate });

    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get the successful room list!',
        data: existingRooms,
    });
});

const addRoom = async (req, res) => {
    const link_img = req.file?.path;

    const { idTypeRoom, acreage, typeBed, capacity, view, prices, status } = req.body;
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

export default { addRoom, updateRoom, getNumberAvailableRooms };
