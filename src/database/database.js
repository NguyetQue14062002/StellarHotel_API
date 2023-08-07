import mongoose from 'mongoose';
import { OutputType, print } from '../helpers/print.js';
import Exception from '../exceptions/Exception.js';

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_URI);
        print('Connect mongoose successfully', OutputType.SUCCESS);
        return connection;
    } catch (error) {
        // let errorMessage = error.code;
        const { code } = error;
        if (error.code === 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
        } else if (error.code === 'ENOTFOUND') {
            throw new Exception(Exception.WRONG_DB_CONNECTION_STRING);
        } else {
            throw new Exception(Exception.CANNOT_CONECT_MONGODB);
        }
    }
};

export default connect;
