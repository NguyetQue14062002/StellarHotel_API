import asyncHandler from 'express-async-handler';
import { bookingRoomRepository } from '../repositories/index.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';
import { dateTimeInputFormat, DateStrFormat } from '../helpers/timezone.js';
import { printDebug, OutputTypeDebug } from '../helpers/printDebug.js';

const bookingRoom = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const checkinDate = dateTimeInputFormat(req.body.checkinDate + ' 12:00', DateStrFormat.DATE_AND_TIME);
    const checkoutDate = dateTimeInputFormat(req.body.checkoutDate + ' 12:00', DateStrFormat.DATE_AND_TIME);
    printDebug(`checkinDate format: ${checkinDate}`, OutputTypeDebug.INFORMATION);
    printDebug(`checkoutDate format: ${checkoutDate}`, OutputTypeDebug.INFORMATION);
    const { typeRoom, quantity, acreage, typeBed, view, prices } = req.body;

    await bookingRoomRepository.bookingRoom({
        userId,
        checkinDate,
        checkoutDate,
        typeRoom,
        quantity,
        acreage,
        typeBed,
        view,
        prices,
    });

    res.status(HttpStatusCode.INSERT_OK).json({
        status: STATUS.SUCCESS,
        message: 'Booking room successful',
    });
});

const getTotalPrices = asyncHandler(async (req, res) => {
    const checkinDate = dateTimeInputFormat(req.query.checkinDate + ' 12:00', DateStrFormat.DATE_AND_TIME);
    const checkoutDate = dateTimeInputFormat(req.query.checkoutDate + ' 12:00', DateStrFormat.DATE_AND_TIME);
    printDebug(`checkinDate format: ${checkinDate}`, OutputTypeDebug.INFORMATION);
    printDebug(`checkoutDate format: ${checkoutDate}`, OutputTypeDebug.INFORMATION);
    const { typeRoom, quantity, acreage, typeBed, view, prices } = req.query;

    const totoaPrices = await bookingRoomRepository.getTotalPrices({
        checkinDate,
        checkoutDate,
        typeRoom,
        quantity,
        acreage,
        typeBed,
        view,
        prices,
    });

    res.status(HttpStatusCode.INSERT_OK).json({
        status: STATUS.SUCCESS,
        message: 'Get total prices successfully',
        data: totoaPrices,
    });
});

export default { bookingRoom, getTotalPrices };
