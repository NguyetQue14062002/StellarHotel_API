// Route-> controller-> service-> model
import express from 'express';
import * as dotenv from 'dotenv'; // tải các biến môi trường từ tệp .env vào tệp process.env
import cors from 'cors';

import { notFound, errorMiddleware } from './src/middleware/errorMiddleware.js';
import loggerMiddleware from './src/middleware/loggerMiddleware.js';
import { OutputTypeDebug, printDebug } from './src/helpers/printDebug.js';
import connect from './src/database/database.js';
import { userRoutes, authRoutes, roomRoutes, typeRoomRoutes, bookingRoomRoutes } from './src/routes/index.js';

dotenv.config();
const app = express();

// app.use(checkToken);
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    }),
);

app.get('/', (req, res) => {
    res.send('Wellcome to Stellar API');
});

app.use(loggerMiddleware); //Logger Middleware
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/type-room', typeRoomRoutes);
app.use('/booking-room', bookingRoomRoutes);

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3002;
connect()
    .then(() => {
        app.listen(port, async () => {
            printDebug(`Server is running on port ${port}`, OutputTypeDebug.INFORMATION);
        });
    })
    .catch(() => {
        printDebug(`Server is not working`, OutputTypeDebug.INFORMATION);
    });
