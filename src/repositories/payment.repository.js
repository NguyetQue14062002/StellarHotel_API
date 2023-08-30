import date from 'date-and-time';
import querystring from 'qs';
import crypto from 'crypto';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';
import { paymentModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';

const createPayment = async ({ userId, amount, bankCode }) => {
    var ipAddr = '127.0.0.1';
    var tmnCode = '9P74Q5DB';
    var secretKey = 'WCBCNCNRFRCERDQNTQLCIWCVQSWJOOCQ';
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = 'http://localhost:8080/payment/vnpay_return';
    var createDate = date.format(new Date(), 'YYYYMMDDHHmmss');
    var orderId = date.format(new Date(), 'HHmmss');
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Dat phong khach san';
    vnp_Params['vnp_OrderType'] = 170000;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    const payment = new paymentModel({
        userId: userId,
        orderId: orderId,
        amount: amount,
        bankCode: bankCode,
        dateCreted: createDate,
    });
    await payment.save();
    return vnpUrl;
};
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
const vnpayReturn = async (vnp_Params) => {
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    var rspCode = vnp_Params['vnp_ResponseCode'];

    vnp_Params = sortObject(vnp_Params);

    var secretKey = 'WCBCNCNRFRCERDQNTQLCIWCVQSWJOOCQ';
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    let paymentStatus = '0';
    let checkOrderId = true;
    let checkAmount = true;
    if (secureHash === signed) {
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == '0') {
                    if (rspCode == '00') {
                        let payment = await paymentModel.findOne({ orderId: vnp_Params['vnp_TxnRef'] });
                        payment.status = 1;
                        await payment.save();
                        printDebug(payment, OutputTypeDebug.INFORMATION);
                        return { Message: 'Giao dịch thành công' };
                    } else {
                        await paymentModel.deleteOne({ orderId: vnp_Params['vnp_TxnRef'] });
                        return { Message: 'Hủy giao dịch thành công' };
                    }
                } else {
                    return { RspCode: '02', Message: 'This order has been updated to the payment status' };
                }
            } else {
                return { RspCode: '04', Message: 'Amount invalid' };
            }
        } else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' });
        }
    } else {
        return 'fail';
    }
};
const getTransaction = async (userId) => {
    const result = await paymentModel.find({ $and: [{ userId: userId }, { status: 1 }] });
    if (!result) {
        return 'Khách hàng chưa có giao dịch nào!';
    }
    return result;
};
const getAllPayment = async ({ page, size, searchString }) => {
    size = parseInt(size);
    page = parseInt(page);
    const filterPayment = await paymentModel
        .aggregate([
            {
                $match: {
                    status: 1,
                    $or: [
                        {
                            orderId: { $regex: `.*${searchString}.*`, $options: 'i' },
                        },
                        {
                            userId: { $regex: `.*${searchString}.*`, $options: 'i' },
                        },
                        {
                            createDate: { $regex: `.*${searchString}.*`, $options: 'i' },
                        },
                    ],
                },
            },
            {
                $sort: { createDate: 1 },
            },
            {
                $skip: (page - 1) * size,
            },
            {
                $limit: size,
            },

            {
                $project: {
                    orderId: 1,
                    userId: 1,
                    amount: 1,
                    bankCode: 1,
                    dateCreted: 1,
                },
            },
        ])
        .exec();

    if (filterPayment) {
        return filterPayment;
    } else {
        throw new Exception(Exception.GET_PAYMENT_FAILED);
    }
};
export default { createPayment, vnpayReturn, getTransaction, getAllPayment };
