import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import {EVENT_STATUS} from '../utils/constants.js';
import mongoose from 'mongoose';
import Event from '../models/EventModels.js';
import User from '../models/UserModels.js';

const withValidationErrors = (validateValues) => {
    return [validateValues, 
        (req, res, next) => {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                const errorMessage = error.array().map((err) => err.msg);
                if(errorMessage[0].startsWith('No event')) throw new NotFoundError(errorMessage);
                if(errorMessage[0].startsWith('Not authorized')) throw new UnauthorizedError('Not authorized to access this resource');
                throw new BadRequestError(errorMessage);
            }
            next();
        }
    ]
}

export const validEventInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required.'),
    body('location').notEmpty().withMessage('Event location is required.'),
    body('date').notEmpty().withMessage('Event date is required.'),
    body('eventHost').notEmpty().withMessage('Hoster name is required.'),
    body('organizerEmail').notEmpty().withMessage('Email is required.'),
    body('eventStatus').isIn(Object.values(EVENT_STATUS)).withMessage('Invalid status value')
]);


export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, {req}) => {
        const isValidMongodbId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidMongodbId) throw new BadRequestError('Invalid MongoDB id');
        const event = await Event.findById(value);
        if(!event) throw new NotFoundError(`No event with id ${value}`);
        const isAdmin = req.user.role === 'Admin';
        const isOwener = req.user.userId === event.createdBy.toString();
        if(!isAdmin && !isOwener) throw new UnauthorizedError('Not authroized to access this resource');
    })
]);

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format').custom(async (email) => {
        const user = await User.findOne({email});
        if(user) throw new BadRequestError('Email already exists');
    }),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({min: 8}).withMessage('Password is at least 8 characters long'),
    body('lastName').notEmpty().withMessage('Last name is required')
]);

export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
]);

