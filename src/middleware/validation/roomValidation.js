import { query } from 'express-validator';
import { dateTimeInputFormat, dateTimeOutputFormat, DateStrFormat } from '../../helpers/timezone.js';

import Exception from '../../exceptions/Exception.js';

const validateGetNumberAvailableRooms = [
    query('typeRoom').trim().not().isEmpty().withMessage(Exception.INVALID_TYPE_ROOM),
    query('checkinDate')
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
    query('checkoutDate')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return (
                dateTimeInputFormat(value, DateStrFormat.DATE) >
                dateTimeInputFormat(req.query.checkinDate, DateStrFormat.DATE)
            );
        })
        .withMessage(Exception.INVALID_CHECKOUT_DATE),
];

const validateGetAcreageRooms = [
    query('typeRoom').trim().not().isEmpty().withMessage(Exception.INVALID_TYPE_ROOM),
]

const validatetypeBedRooms = [
    query('typeRoom').trim().not().isEmpty().withMessage(Exception.INVALID_TYPE_ROOM),
]

export default { validateGetNumberAvailableRooms, validateGetAcreageRooms, validatetypeBedRooms };
