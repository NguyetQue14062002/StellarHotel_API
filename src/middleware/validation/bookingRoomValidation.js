import { body } from 'express-validator';
import { dateTimeInputFormat, DateStrFormat, dateTimeOutputFormat } from '../../helpers/timezone.js';

import Exception from '../../exceptions/Exception.js';

const validateBookingRoom = [
    body('typeRoom').trim().not().isEmpty().withMessage(Exception.INVALID_TYPE_ROOM),
    body('checkinDate')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return (
                dateTimeInputFormat(value, DateStrFormat.DATE) >=
                dateTimeInputFormat(dateTimeOutputFormat(new Date(), DateStrFormat.DATE), DateStrFormat.DATE)
            );
        })
        .withMessage(Exception.INVALID_CHECKIN_DATE),
    body('checkoutDate')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return (
                dateTimeInputFormat(value, DateStrFormat.DATE) >
                dateTimeInputFormat(req.body.checkinDate, DateStrFormat.DATE)
            );
        })
        .withMessage(Exception.INVALID_CHECKOUT_DATE),
];

export default { validateBookingRoom };
