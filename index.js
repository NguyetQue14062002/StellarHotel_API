// Route-> controller-> service-> model
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.send('Wellcome to Stellar API');
});
app.listen(port , async() => {
    console.log(`Server is running on port ${port}`);
});
