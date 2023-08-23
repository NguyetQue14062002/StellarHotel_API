import { userModel } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';

//Client
const getUser = async (userId) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.GET_USER_FAILED);
    }
    return {
        id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
        gender: existingUser.gender,
        nationality: existingUser.nationality,
        yearOfBirth: existingUser.yearOfBirth,
    }
};

const updateProfile = async ({ id, email, userName, phoneNumber, gender, nationality, yearOfBirth }) => {
    let existingUser = await userModel.findById(id);
    if (!existingUser) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
    // Update information user
    existingUser.email = email ?? existingUser.email;
    existingUser.userName = userName ?? existingUser.userName;
    existingUser.phoneNumber = phoneNumber ?? existingUser.phoneNumber;
    existingUser.gender = gender ?? existingUser.gender;
    existingUser.nationality = nationality ?? existingUser.nationality;
    existingUser.yearOfBirth = yearOfBirth ?? existingUser.yearOfBirth;
    await existingUser.save().catch((exception) => {
        printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
        throw new Exception(Exception.UPDATE_USER_FAILED);
    });
    return {
        id: existingUser._id,
        userName: existingUser.userName,
        yearOfBirth: existingUser.yearOfBirth,
        gender: existingUser.gender,
        nationality: existingUser.nationality,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
    };
};

//Admin
const getAllUser = async ({ page, size, searchString }) => {
    const filterUser = await userModel.aggregate([
        { $match: {
            role: process.env.CLIENT,
            $or:[
                {
                    email: { $regex: searchString, $options: 'i' },
                },
                {
                    userName: { $regex: searchString, $options: 'i' },
                },
                {
                    phoneNumber: { $regex: searchString, $options: 'i' },
                },
            ]
        }
        },

        {
            $skip: (page - 1) * size,
        },
        {
            $limit: Number(size),
        },
        {
            $project: {
                email: 1,
                userName: 1,
                phoneNumber: 1,
                gender: 1,
                nationality: 1,
                yearOfBirth: 1,             
            },
        },
    ]);
    if (filterUser) {
       return filterUser;
    } else {
        throw new Exception(Exception.GET_USER_FAILED);
    }
};

const updateUser  = async ({ id, email, userName, phoneNumber, gender, nationality, yearOfBirth }) => {
    let existingUser = await userModel.findById(id);
    if (!existingUser) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    // Update information user
    existingUser.email = email ?? existingUser.email;
    existingUser.userName = userName ?? existingUser.userName;
    existingUser.phoneNumber = phoneNumber ?? existingUser.phoneNumber;
    existingUser.gender = gender ?? existingUser.gender;
    existingUser.nationality = nationality ?? existingUser.nationality;
    existingUser.yearOfBirth = yearOfBirth ?? existingUser.yearOfBirth;
    await existingUser.save().catch((exception) => {
        printDebug(`${exception.message}`, OutputTypeDebug.ERROR);
        throw new Exception(Exception.UPDATE_USER_FAILED);
    });

    return {
        id: existingUser._id,
        userName: existingUser.userName,
        yearOfBirth: existingUser.yearOfBirth,
        gender: existingUser.gender,
        nationality: existingUser.nationality,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
    };
};
const deleteUser = async (userId) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.GET_USER_FAILED);
    }
    try {
        await existingUser.deleteOne({
            _id: userId,
        })
        return  Exception.DELETE_USER_SUCCESS;
    }catch (exception) {
        throw new Exception(Exception.DELETE_USER_FAILED);
    }
   
};
export default { updateProfile ,getUser,  getAllUser, updateUser, deleteUser };
