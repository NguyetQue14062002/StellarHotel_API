// Route-> controller-> service-> model
import express from 'express';
import * as dotenv from 'dotenv'; // tải các biến môi trường từ tệp .env vào tệp process.env
import cors from 'cors';

import { OutputType, print } from './src/helpers/print.js';
import connect from './src/database/database.js';
import { authRoutes } from './src/routes/index.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
app.get('/', (req, res) => {
    res.send('Wellcome to Stellar API');
});
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3002;
connect()
    .then(() => {
        app.listen(port, async () => {
            print(`Server is running on port ${port}`, OutputType.INFORMATION);
        });
    })
    .catch(() => {
        print(`Server is not working`, OutputType.INFORMATION);
    });
