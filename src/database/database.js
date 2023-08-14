import mongoose from 'mongoose';
import { OutputTypeDebug, printDebug } from '../helpers/printDebug.js';
import chalk from 'chalk';
import Exception from '../exceptions/Exception.js';

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(chalk.green('Connect mongoose successfully'));
        return connection;
    } catch (error) {
        console.log(chalk.red(Exception.CANNOT_CONECT_MONGODB));

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
