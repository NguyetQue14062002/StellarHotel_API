import { typeRoomModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { OutputType, print } from '../helpers/print.js';

const filterTypeRooms = async ({ page, size, searchString }) => {
    const filterTypeRooms = await typeRoomModel.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' },
                    },
                ],
            },
        },
        {
            $skip: (page - 1) * size,
        },
        {
            $limit: size,
        },
        {
            $project: {
                email: 1,
                image: 1,
                description: 1,
            },
        },
    ]);

    if (!filterTypeRooms) {
        throw new Exception(Exception.DATA_RETRIEVAL_FAILED);
    }

    return filterTypeRooms;
};

export default { filterTypeRooms };
