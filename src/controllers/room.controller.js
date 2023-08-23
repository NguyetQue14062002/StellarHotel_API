import asyncHandler from 'express-async-handler';
import { roomRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';
import { dateTimeInputFormat, DateStrFormat } from '../helpers/timezone.js';
import { printDebug, OutputTypeDebug } from '../helpers/printDebug.js';
import { hashSync } from 'bcrypt';

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

const createRoom = asyncHandler(async (req, res) => {
    const { idTypeRoom,roomNumber, acreage, typeBed, capacity, view, prices, status } = req.body;
   
        const result = await roomRepository.createRoom({
            idTypeRoom,roomNumber,acreage, typeBed, capacity, view, prices, status});
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Add Room successfully.',
            data: result,
        });
   
          
});

const updateRoom = async (req, res) => {
    const { name, roomNumber, acreage, typeBed, capacity, view, prices, status } = req.body;
    try {
        const result = await roomRepository.updateRoom(
            name,
            roomNumber,
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

export default { createRoom, updateRoom, getNumberAvailableRooms };
