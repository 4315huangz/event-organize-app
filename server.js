import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json());
import mongoose from "mongoose";
import morgan from "morgan";
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//import routers
import eventRouter from './routes/eventRouter.js';
app.use('/api/v1/events', eventRouter);


//Default error catch for invalid url
app.use('*', (req, res) => {
    res.status(404).json({msg: "Not found"});
});

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
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