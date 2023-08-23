import { userModel, bookingRoomModel, typeRoomModel, roomModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';

const bookingRoom = async ({
    userId,
    checkinDate,
    checkoutDate,
    typeRoom,
    quantity,
    acreage,
    typeBed,
    view,
    prices,
}) => {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
        printDebug('Không tồn tại User', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.BOOKING_FAILED);
    }

    const existingTypeRoom = await typeRoomModel.findById(typeRoom);
    if (!existingTypeRoom) {
        printDebug('Không tồn tại loại phòng', OutputTypeDebug.INFORMATION);
        throw new Exception(Exception.BOOKING_FAILED);
    }

    const getListRoomsBookedByDate = await bookingRoomModel
        .find(
            {
                typeRoom: existingTypeRoom.id,
                checkinDate: { $gte: checkinDate },
                checkoutDate: { $lte: checkoutDate },
            },
            { _id: 0, room: 1 },
        )
        .exec()
        .then((elements) => {
            let idRooms = [];
            elements.map((element) => idRooms.push(...element.room));
            return idRooms;
        })
        .catch((exception) => {
            printDebug('Lấy danh sách phòng đã đặt thất bại', OutputTypeDebug.INFORMATION);
            printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
            throw new Exception(Exception.BOOKING_FAILED);
        });
    printDebug(`getListRoomsBookedByDate: ${getListRoomsBookedByDate}`, OutputTypeDebug.INFORMATION);

    let parameters = { typeRoom: existingTypeRoom._id };
    if (acreage) {
        parameters = { ...parameters, acreage };
    }
    if (typeBed) {
        parameters = { ...parameters, typeBed };
    }
    if (view) {
        parameters = { ...parameters, view };
    }
    if (prices) {
        parameters = { ...parameters, prices };
    }

    const handleBookingRooms = await roomModel
        .find(parameters, { _id: 1, roomNumber: 1, prices: 1 })
        .sort({ roomNumber: 1 })
        .exec()
        .then((elements) => {
            const getAvailableRooms = elements.filter((item) => {
                return (
                    !getListRoomsBookedByDate.includes(item.roomNumber) && {
                        id: item.id,
                        roomNumber: item.roomNumber,
                        prices: item.prices,
                    }
                );
            });
            printDebug(`getAvailableRooms: ${getAvailableRooms}`, OutputTypeDebug.INFORMATION);

            return {
                getAvailableRooms,
                idRooms: getAvailableRooms.slice(0, quantity).map((element) => element.roomNumber),
                totalPrice: getAvailableRooms
                    .slice(0, quantity)
                    .map((element) => element.prices)
                    .reduce((partialSum, a) => partialSum + a, 0),
            };
        })
        .catch((exception) => {
            printDebug('Xử lý phòng bị lỗi', OutputTypeDebug.INFORMATION);
            printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
            throw new Exception(Exception.BOOKING_FAILED);
        });

    if (handleBookingRooms.getAvailableRooms.length === 0) {
        throw new Exception(Exception.OUT_OF_ROOMS);
    }
    if (handleBookingRooms.getAvailableRooms.length < quantity) {
        throw new Exception(`Stellar only ${handleBookingRooms.idRooms.length} rooms left`);
    }
    printDebug(`Lấy danh sách mã phòng thành công: ${handleBookingRooms.idRooms}`, OutputTypeDebug.INFORMATION);
    printDebug(`Tổng tiền đặt phòng: ${handleBookingRooms.totalPrice}`, OutputTypeDebug.INFORMATION);

    await bookingRoomModel
        .create({
            user: existingUser._id,
            typeRoom,
            quantity,
            checkinDate,
            checkoutDate,
            room: handleBookingRooms.idRooms,
            totalprice: handleBookingRooms.totalPrice,
        })
        .catch((exception) => {
            printDebug('Đặt phòng khong thành công!', OutputTypeDebug.INFORMATION);
            printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
            throw new Exception(Exception.BOOKING_FAILED);
        });
};

export default { bookingRoom };
