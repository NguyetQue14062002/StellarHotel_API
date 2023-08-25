import { userModel, bookingRoomModel, typeRoomModel, roomModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';
import asyncHandler from 'express-async-handler';
import { dDate, dateTimeOutputFormat, DateStrFormat } from '../helpers/timezone.js';

const handleBookingRooms = asyncHandler(
    async ({ checkinDate, checkoutDate, typeRoom, quantity, acreage, typeBed, view, prices, messageError }) => {
        const existingTypeRoom = await typeRoomModel.findById(typeRoom);
        if (!existingTypeRoom) {
            printDebug('Không tồn tại loại phòng', OutputTypeDebug.INFORMATION);
            throw new Exception(messageError);
        }

        const getListRoomsBookedByDate = await bookingRoomModel
            .find(
                {
                    $and: [
                        {
                            typeRoom: existingTypeRoom.id,
                        },
                        {
                            $or: [
                                {
                                    checkinDate: { $gt: checkinDate, $lt: checkoutDate },
                                    checkoutDate: { $gte: checkoutDate },
                                },
                                {
                                    checkinDate: { $lte: checkinDate },
                                    checkoutDate: { $gte: checkoutDate },
                                },
                                {
                                    checkinDate: { $lte: checkinDate },
                                    checkoutDate: { $gt: checkinDate, $lt: checkoutDate },
                                },
                                {
                                    checkinDate: { $gt: checkinDate },
                                    checkoutDate: { $lt: checkoutDate },
                                },
                            ],
                        },
                    ],
                },
                { _id: 0, rooms: 1 },
            )
            .exec()
            .then((elements) => {
                let idRooms = [];
                elements.map((element) => idRooms.push(...element.rooms));
                return idRooms;
            })
            .catch((exception) => {
                printDebug('Lấy danh sách phòng đã đặt thất bại', OutputTypeDebug.INFORMATION);
                printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
                throw new Exception(messageError);
            });
        printDebug(`getListRoomsBookedByDate: ${getListRoomsBookedByDate}`, OutputTypeDebug.INFORMATION);

        // Xử lý tham số truyền vào
        // Lọc và tìm kiếm phòng đặt hợp lệ
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

                const d = dDate(checkinDate, checkoutDate);
                printDebug(`dDate: ${d}`, OutputTypeDebug.INFORMATION);

                return {
                    getAvailableRooms,
                    idRooms: getAvailableRooms.slice(0, quantity).map((element) => element.roomNumber),
                    totalPrice: getAvailableRooms
                        .slice(0, quantity)
                        .map((element) => element.prices)
                        .reduce((partialSum, a) => partialSum + a * d, 0),
                };
            })
            .catch((exception) => {
                printDebug('Xử lý phòng bị lỗi', OutputTypeDebug.INFORMATION);
                printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
                throw new Exception(messageError);
            });

        if (handleBookingRooms.getAvailableRooms.length === 0) {
            throw new Exception(Exception.OUT_OF_ROOMS);
        }
        if (handleBookingRooms.getAvailableRooms.length < quantity) {
            throw new Exception(`Stellar only ${handleBookingRooms.idRooms.length} rooms left`);
        }
        printDebug(`Lấy danh sách mã phòng thành công: ${handleBookingRooms.idRooms}`, OutputTypeDebug.INFORMATION);
        printDebug(`Tổng tiền đặt phòng: ${handleBookingRooms.totalPrice}`, OutputTypeDebug.INFORMATION);

        return handleBookingRooms;
    },
);

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

    let messageError = Exception.BOOKING_FAILED;

    const getInfoBookingRooms = await handleBookingRooms({
        checkinDate,
        checkoutDate,
        typeRoom,
        quantity,
        acreage,
        typeBed,
        view,
        prices,
        messageError,
    });

    await bookingRoomModel
        .create({
            user: existingUser._id,
            typeRoom,
            quantity,
            checkinDate,
            checkoutDate,
            rooms: getInfoBookingRooms.idRooms,
            totalprice: getInfoBookingRooms.totalPrice,
        })
        .catch((exception) => {
            printDebug('Đặt phòng khong thành công!', OutputTypeDebug.INFORMATION);
            printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
            throw new Exception(Exception.BOOKING_FAILED);
        });
};

const getTotalPrices = async ({ checkinDate, checkoutDate, typeRoom, quantity, acreage, typeBed, view, prices }) => {
    let messageError = Exception.GET_TOTAL_PRICES_FAILED;

    const getInfoBookingRooms = await handleBookingRooms({
        checkinDate,
        checkoutDate,
        typeRoom,
        quantity,
        acreage,
        typeBed,
        view,
        prices,
        messageError,
    });

    return { totalPrice: getInfoBookingRooms.totalPrice };
};

const getTransactionHistory = async ({ userId }) => {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.GET_TRANSACTION_HISTORY_FAILED);
    }

    return await bookingRoomModel
        .find(
            { user: existingUser._id },
            { _id: 1, typeRoom: 1, rooms: 1, quantity: 1, totalprice: 1, status: 1, checkinDate: 1, checkoutDate: 1 },
        )

        .populate({ path: 'typeRoom', select: { _id: 0, name: 1 } })
        .sort({ createdAt: 1 })
        .exec()
        .then((results) => {
            return results.map((result) => {
                const { typeRoom, checkinDate, checkoutDate, ...objNew } = result;
                objNew._doc.typeRoom = typeRoom.name;
                objNew._doc.checkinDate = dateTimeOutputFormat(checkinDate, DateStrFormat.DATE_AND_TIME);
                objNew._doc.checkoutDate = dateTimeOutputFormat(checkoutDate, DateStrFormat.DATE_AND_TIME);
                return objNew._doc;
            });
        })
        .catch((exception) => {
            printDebug('Đặt phòng khong thành công!', OutputTypeDebug.INFORMATION);
            printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
            throw new Exception(Exception.GET_TRANSACTION_HISTORY_FAILED);
        });
};

const getAllTransactionHistory = async () => {
    return await bookingRoomModel
        .find(
            {},
            {
                _id: 1,
                user: 1,
                typeRoom: 1,
                rooms: 1,
                quantity: 1,
                totalprice: 1,
                status: 1,
                checkinDate: 1,
                checkoutDate: 1,
            },
        )
        .populate({ path: 'user', select: { _id: 1 } })
        .populate({ path: 'typeRoom', select: { _id: 0, name: 1 } })
        .sort({ createdAt: 1 })
        .exec()
        .then((results) => {
            return results.map((result) => {
                const { user, typeRoom, checkinDate, checkoutDate, ...objNew } = result;
                objNew._doc.user = user.id;
                objNew._doc.typeRoom = typeRoom.name;
                objNew._doc.checkinDate = dateTimeOutputFormat(checkinDate, DateStrFormat.DATE_AND_TIME);
                objNew._doc.checkoutDate = dateTimeOutputFormat(checkoutDate, DateStrFormat.DATE_AND_TIME);
                return objNew._doc;
            });
        })
        .catch((exception) => {
            printDebug('Đặt phòng khong thành công!', OutputTypeDebug.INFORMATION);
            printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
            throw new Exception(Exception.GET_ALL_TRANSACTION_HISTORY_FAILED);
        });
};

export default { bookingRoom, getTotalPrices, getTransactionHistory, getAllTransactionHistory };
