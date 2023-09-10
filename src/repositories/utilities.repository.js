import { utilitiesModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';


const getAllUtilities = async (page, size, searchString) => {
    const filterUtilities = await utilitiesModel.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' },
                    },
                    {
                        type: { $regex: `.*${searchString}.*`, $options: 'i' },
                    }
                    
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
                id: 1,
                name: 1,
                description: 1,
                image: 1,
                type: 1,
            },
        },
    ]);
    if (filterUtilities) {
        return filterUtilities;
    } else {
        throw new Exception(Exception.UTILITIES_NOT_EXIST);
    }
};
const createUtility = async (name, link_img, description) => {
    const existingUtilities = await utilitiesModel.findOne({ name });
    if (existingUtilities) {
        throw new Exception(Exception.UTILITIES_EXIST);
    } else {
        const newUtility = await utilitiesModel.create({
            name,
            image: link_img,
            description,
        });
        if (!newUtility) {
            throw new Exception(Exception.CREATE_UTILITIES_ERROR);
        }
        return {
            id: newUtility._id,
            name: newUtility.name,
            image: newUtility.image,
            description: newUtility.description,
        };
    }
};
const updateUtility = async (id, name, link_img, description) => {
    try {
        let existingUtilities = await utilitiesModel.findById(id);
        if (!existingUtilities) {
            throw new Error('Utilities not exist');
        } else {
            existingUtilities.name = name ?? existingUtilities.name;
            existingUtilities.image = link_img ?? existingUtilities.image;
            existingUtilities.description = description ?? existingUtilities.description;
            await existingUtilities.save();
            return {
                id: existingUtilities._id,
                name: existingUtilities.name,
                image: existingUtilities.image,
                description: existingUtilities.description,
            };
        }
    } catch (error) {
        throw new Exception(error.message);
    }
};
const deleteUtility = async (id) => {
    try {
        let existingUtilities = await utilitiesModel.findById(id);
        if (!existingUtilities) {
            throw new Error('Utilities not exist');
        } else {
            await existingUtilities.deleteOne(
                {
                    _id: id,
                }
            );
            return Exception.DELETE_UTILITIES_SUCCESS;
        }
    } catch (error) {
        throw new Exception(error.message);
    }
};
export default { getAllUtilities, createUtility, updateUtility, deleteUtility };
