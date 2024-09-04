import {StatusCodes} from 'http-status-codes';
import User from '../models/UserModels.js';
import Event from '../models/EventModels.js';


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId});
    const userWithoutPW = user.toJSON();
    res.status(StatusCodes.OK).json({userWithoutPW});
}

export const getApplicationStatus = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'get status'});
}

export const updateUser = async (req, res) => {
    const obj = {...req.body};
    delete obj.password;
    console.log(obj);
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
    res.status(StatusCodes.OK).json({msg: 'The user is updated successfully.'});
}