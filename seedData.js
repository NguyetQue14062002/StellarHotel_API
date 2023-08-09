import express from 'express';
import dotenv from 'dotenv';
import { OutputType, print } from './src/helpers/print.js';
import connect from './src/database/database.js';

import { userModel, typeRoomModel, roomModel } from './src/models/index.js';
import { TYPE_ROOMS, DESCRIPTION_ROOM, TYPE_BED } from './src/global/constants.js';

const app = express();
app.use(express.json());
dotenv.config();

connect()
    .then(async () => {
        const myTypeRooms = [
            {
                name: TYPE_ROOMS.SUPERIOR_DOUBLE_OR_TWIN_ROOM,
                description: DESCRIPTION_ROOM.SUPERIOR_DOUBLE_OR_TWIN_ROOM,
            },
            {
                name: TYPE_ROOMS.DELUXE_DOUBLE_ROOM,
                description: DESCRIPTION_ROOM.DELUXE_DOUBLE_ROOM,
            },
            {
                name: TYPE_ROOMS.EXECUTIVE_CITY_VIEW_ROOM,
                description: DESCRIPTION_ROOM.EXECUTIVE_CITY_VIEW_ROOM,
            },
            {
                name: TYPE_ROOMS.SUITE_GARDEN_ROOM,
                description: DESCRIPTION_ROOM.SUITE_GARDEN_ROOM,
            },
        ];

        let isExist = await typeRoomModel.insertMany(myTypeRooms);
        if (isExist) {
            print('Insert Type rooms success', OutputType.SUCCESS);
        } else {
            print('Insert Type rooms fail', OutputType.ERROR);
        }
    })
    .then(async () => {
        let isExistingTypeRoom = await typeRoomModel.find({ name: TYPE_ROOMS.SUPERIOR_DOUBLE_OR_TWIN_ROOM });

        const myRooms_SDoTR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 101,
                acreage: 23,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 102,
                acreage: 20,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '200000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 103,
                acreage: 23,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 104,
                acreage: 20,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '200000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 105,
                acreage: 23,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
        ];

        isExistingTypeRoom = await typeRoomModel.find({ name: TYPE_ROOMS.DELUXE_DOUBLE_ROOM });

        const myRooms_DDR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 201,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 202,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 203,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 204,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 205,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
        ];

        isExistingTypeRoom = await typeRoomModel.find({ name: TYPE_ROOMS.EXECUTIVE_CITY_VIEW_ROOM });

        const myRooms_ECVR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 301,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 302,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 303,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 304,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 305,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
        ];

        isExistingTypeRoom = await typeRoomModel.find({ name: TYPE_ROOMS.SUITE_GARDEN_ROOM });

        const myRooms_SGR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 401,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 402,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 403,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 404,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 405,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
        ];

        const myRoom = [...myRooms_SDoTR, ...myRooms_DDR, ...myRooms_ECVR, ...myRooms_SGR];

        let isExist = await roomModel.insertMany(myRoom);
        if (isExist) {
            print('Insert Rooms success', OutputType.SUCCESS);
        } else {
            print('Insert Rooms fail', OutputType.ERROR);
        }
    })
    .catch((error) => {
        print(`Init database failed: \n ${error}`, OutputType.ERROR);
    });
