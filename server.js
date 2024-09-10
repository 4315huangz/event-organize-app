import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json());
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
app.use(cookieParser());
import cloudinary from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


//routers
import eventRouter from './routes/eventRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
//public
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api/v1/events', authenticateUser, eventRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.get('/api/v1/test', (req, res) => {
    res.send({msg:"helloworld"});
})

//Default error catch for invalid url
app.use('*', (req, res) => {
    res.status(404).json({msg: "Not found"});
});

//Other error handler
app.use(errorHandlerMiddleware); 

//Connect to mongoDB
const port = process.env.PORT || 5100;
console.log(process.env.MONGO_URL);
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`Server running on ${port}...`);
    });
} catch (err) {
    console.log(err);
    process.exit(1);
}