import express from 'express';
import dotenv from 'dotenv';
import { OutputType, print } from './src/helpers/print.js';
import connect from './src/database/database.js';

import { userModel } from './src/models/index.js';

const app = express();
app.use(express.json());
dotenv.config();

connect()
    .then(async () => {
        const myUser = [
            {
                email: 'nguyetquepham7@gmail.com',
                password: 'Tinh1234',
                userName: 'Bùi Quốc Tĩnh',
                phoneNumber: '0946541256',
                nationality: 'Việt Nam',
                yearOfBirth: 2002,
            },
            {
                email: '20110728@gmail.com',
                password: 'Tinh1234',
                userName: 'Bùi Quốc Tĩnh a',
                phoneNumber: '0946541257',
                nationality: 'Việt Nam',
                yearOfBirth: 2002,
            },
            {
                email: '20110729@gmail.com',
                password: 'Tinh1234',
                userName: 'Bùi Quốc Tĩnh b',
                phoneNumber: '0946541258',
                nationality: 'Việt Nam',
                yearOfBirth: 2002,
            },
            {
                email: '20110730@gmail.com',
                password: 'Tinh1234',
                userName: 'Bùi Quốc Tĩnh c',
                phoneNumber: '0946541259',
                nationality: 'Việt Nam',
                yearOfBirth: 2002,
            },
        ];

        let isExist = await userModel.insertMany(myUser);
        if (isExist) {
            print('Insert Users success', OutputType.SUCCESS);
        } else {
            print('Insert Users fail', OutputType.ERROR);
        }
    })
    .catch((error) => {
        print(`Init database failed: \n ${error}`, OutputType.ERROR);
    });
