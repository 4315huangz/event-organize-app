import User from '../models/UserModels.js';
import { StatusCodes } from "http-status-codes";
import { ROLES } from '../utils/constants.js';
import {hashPassword, validatePassword} from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/jwtUtils.js';

export const register = async (req, res) => {
    const isFirstUser = await User.countDocuments() === 0;
    req.body.role = isFirstUser? ROLES.ADMIN : ROLES.USER;

    const hashedPW = await hashPassword(req.body.password);
    req.body.password = hashedPW;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'User is created' });
}

export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    const isValidUser = user && (await validatePassword(req.body.password, user.password));
    if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

    const token = createJWT({userId: user._id, role:user.role});
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly:true, 
        expires:new Date(Date.now() + oneDay), 
        secure: process.env.NODE_ENV === 'production'})
    res.status(StatusCodes.OK).json({msg: 'User logged in'});
}

export const getAllUser = async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json(users);
}