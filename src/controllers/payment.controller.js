import asyncHandler from 'express-async-handler';
import {paymentRepository} from '../repositories/index.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import {STATUS, MAX_RECORDS } from '../global/constants.js';

const createPayment = asyncHandler(async (req, res) => {
    const {amount,  bankCode} = req.body;
    const userId = req.userId;
    const result = await paymentRepository.createPayment({userId,amount,  bankCode});
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Create Payment successfully.',
        data: result,
    });

});
const vnpayReturn = asyncHandler(async (req, res) => {
    var vnp_Params = req.query;

    const result = await paymentRepository.vnpayReturn(vnp_Params);
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'get status payment successfully.',
        data: result,
    });
});
const getTransaction = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const result = await paymentRepository.getTransaction(userId);
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'get transaction successfully.',
        data: result,
    });
});
const getAllPayment = asyncHandler(async (req, res) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    const filterPayment = await paymentRepository.getAllPayment({ page, size, searchString });
    res.status(HttpStatusCode.OK).json({
        status: STATUS.SUCCESS,
        message: 'Get the list of successful payments.',
        data: filterPayment,
    });

});

export default { createPayment, vnpayReturn, getTransaction, getAllPayment};