import moment from 'moment-timezone';
import { userModel, bookingRoomModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { OutputType, print } from '../helpers/print.js';

const bookingRoom = async ({ user, typeRoom, quantity, checkinDate, checkoutDate }) => {
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
        throw new Exception(Exception.BOOKING_FAILED);
    }

    const formatStr = 'DD-MM-YYYY hh:mm';

    checkinDate = moment
        .utc(checkinDate + ' 5:00', formatStr)
        .tz('Etc/UTC')
        .format();

    print(`checkinDate: ${checkinDate}`, OutputType.INFORMATION);

    checkoutDate = moment
        .utc(checkoutDate + ' 5:00', formatStr)
        .tz('Asia/Ho_Chi_Minh')
        .format();
    print(`checkoutDate: ${checkoutDate}`, OutputType.INFORMATION);

    await bookingRoomModel
        .create({
            user: existingUser._id,
            typeRoom,
            quantity,
            checkinDate,
            checkoutDate,
        })
        .catch((exception) => {
            print(`${exception.message}`, OutputType.ERROR);
            throw new Exception(Exception.BOOKING_FAILED);
        });
};

export default { bookingRoom };
