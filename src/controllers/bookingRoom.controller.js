import { bookingRoomRepository } from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS } from '../global/constants.js';

const bookingRoom = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { user, checkinDate, checkoutDate, typeRoom, quantity } = req.body;

    try {
        await bookingRoomRepository.bookingRoom({
            user,
            typeRoom,
            quantity,
            checkinDate,
            checkoutDate,
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Booking room successful',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

export default { bookingRoom };
