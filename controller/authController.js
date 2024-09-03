import User from '../models/UserModels.js';
import { StatusCodes } from "http-status-codes";
import { ROLES } from '../utils/constants.js';
import {hashPassword} from '../utils/passwordUtils.js';

export const register = async (req, res) => {
    const isFirstUser = await User.countDocuments() === 0;
    req.body.role = isFirstUser? ROLES.ADMIN : ROLES.USER;
    const hashedPW = await hashPassword(req.body.password);
    req.body.password = hashedPW;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'User is created' });
}

export const login = async (req, res) => {
    // const user = await User.findOne(req.body('email'));
    // res.status(StatusCodes.OK).json({user});
    res.send("lgin");
}

export const getAllUser = async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json(users);
}