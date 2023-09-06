import asyncHandler from 'express-async-handler';
import { bookingRoomRepository } from '../repositories/index.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';
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

    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get total prices successfully',
        data: totoaPrices,
    });
});

const getTransactionHistory = asyncHandler(async (req, res) => {
    const userId = req.userId;
    let { page = 1, size = MAX_RECORDS } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    const existingUser = await bookingRoomRepository.getTransactionHistory({ userId, page, size });

    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get a list of successful transaction history',
        data: existingUser,
    });
});

const getTotalTransactionHistory = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const existingUser = await bookingRoomRepository.getTotalTransactionHistory({ userId });

    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get total list of successful transaction history',
        data: existingUser,
    });
});

const getAllTransactionHistory = asyncHandler(async (req, res) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    const existingUser = await bookingRoomRepository.getAllTransactionHistory({ page, size, searchString });

    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get a complete list of successful transaction history',
        data: existingUser,
    });
});

const createPayment = asyncHandler(async (req, res) => {
    const { orderId, bankCode } = req.body;
    const result = await bookingRoomRepository.createPayment({ orderId, bankCode });
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Create Payment successfully.',
        data: result,
    });
});
const vnpayReturn = asyncHandler(async (req, res) => {
    var vnp_Params = req.query;

    const result = await bookingRoomRepository.vnpayReturn(vnp_Params);
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'get status payment successfully.',
        data: result,
    });
});

export default {
    bookingRoom,
    getTotalPrices,
    getTransactionHistory,
    getAllTransactionHistory,
    getTotalTransactionHistory,
    createPayment,
    vnpayReturn,
};
