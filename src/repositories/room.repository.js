import { roomModel, typeRoomModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { TYPE_BED } from '../global/constants.js';
import { OutputType, print } from '../helpers/print.js';

const getAvailableRooms = async ({ page, size, searchString }) => {};

const addRoom = async (idTypeRoom, roomNumber, image, acreage, typeBed, capacity, view, prices, status) => {
    let existingTypeRoom = await typeRoomModel.findById(idTypeRoom);
    if (!existingTypeRoom) {
        throw new Exception(Exception.TYPE_ROOM_NOT_EXIST);
    }
    let Room = await roomModel.create({
        idTypeRoom: existingTypeRoom._id,
        roomNumber,
        image,
        acreage,
        typeBed: TYPE_BED[typeBed],
        capacity,
        view,
        prices,
        status,
    });
    if (!Room) {
        throw new Exception(Exception.CANNOT_ADD_ROOM);
    }
    return {
        id: Room._id,
        typeRoom: existingTypeRoom.name,
        roomNumber: Room.roomNumber,
        image: Room.image,
        description: existingTypeRoom.description,
        acreage: Room.acreage,
        typeBed: Room.typeBed,
        capacity: Room.capacity,
        view: Room.view,
        prices: Room.prices,
        status: Room.status,
    };
};

const updateRoom = async (name, roomNumber, image, acreage, typeBed, capacity, view, prices, status) => {
    let existingTypeRoom = await typeRoomModel.findOne({ name });
    if (!existingTypeRoom) {
        throw new Exception(Exception.TYPE_ROOM_NOT_EXIST);
    }

    let Room = await roomModel.findOneAndUpdate(roomModel.roomNumber, {
        typeRoom: existingTypeRoom.id,
        image,
        acreage,
        typeBed: TYPE_BED[typeBed],
        capacity,
        view,
        prices,
        status,
    });
    if (!Room) {
        throw new Exception(Exception.CANNOT_UPDATE_ROOM);
    }
    return {
        id: Room._id,
        typeRoom: existingTypeRoom.name,
        roomNumber: Room.roomNumber,
        image: Room.image,
        description: existingTypeRoom.description,
        acreage: Room.acreage,
        typeBed: Room.typeBed,
        capacity: Room.capacity,
        view: Room.view,
        prices: Room.prices,
        status: Room.status,
    };
};

export default { getAvailableRooms, addRoom, updateRoom };
