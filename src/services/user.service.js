import  {userModel} from'../models/index.js';
import Exception from '../exceptions/Exception.js';
const getAllUser = async ({
    page,
    size,
    searchString,
}) => {
    const filterUser = await userModel.aggregate([
        {
            $match: {
                $or: [
                    
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
            $skip: (page - 1) * size 
        },
        {
            $limit: size
        },
        {
            $project:  {
                email: 1,
                userName: 1,
                phoneNumber: 1,
                gender: 1,
                nationality: 1,
                yearOfBirth: 1,              
            }
        }
    ]);
    if (filterUser) {
       return filterUser;
    }else{
        throw new Exception(Exception.GET_USER_FAILED);
    }
};
export default {getAllUser};