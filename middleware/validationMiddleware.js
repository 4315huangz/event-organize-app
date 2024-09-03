import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import {EVENT_STATUS} from '../utils/constants.js';
import mongoose from 'mongoose';
import Event from '../models/EventModels.js';

const withValidationErrors = (validateValues) => {
    return [validateValues, 
        (req, res, next) => {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                const errorMessage = error.array().map((err) => err.msg);
                if(errorMessage[0].startsWith('No event')) {throw new NotFoundError(errorMessage);}
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
    param('id')
    .custom(async (value) => {
        const isValidMongodbId = mongoose.Types.ObjectId.isValid(value);
        if(!isValidMongodbId) {throw new BadRequestError('Invalid MongoDB id');}
        const event = await Event.findById(value);
        if(!event) throw new NotFoundError(`No event with id ${value}`)
    })
]);

