import { BadRequestError } from "../errors/customErrors.js";
import Event from "../models/EventModels.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModels.js";

export const getAllEvents = async (req, res) => {
    const {name, location, eventStatus, sort} = req.query;
    const queryObj = {$or:[
        {createdBy: req.user.userId},
        {participants: { $in: [req.user.userId] }}
    ]};
    if(name && location) {
        queryObj.$and = [
            { name: { $regex: new RegExp(name, 'i') } },
            { location: { $regex: new RegExp(location, 'i') } }
        ];
    }else if (name || location) {
        queryObj.$or = [];
        if (name) {
            queryObj.$or.push({ name: { $regex: new RegExp(name, 'i') } });
        }
        if (location) {
            queryObj.$or.push({ location: { $regex: new RegExp(location, 'i') } });
        }
    }
    if(eventStatus && eventStatus !== 'All') {
        queryObj.eventStatus = { $regex: new RegExp(eventStatus, 'i') };;
    }

    const sortOptions = {
        newest: '-date',
        oldest: 'date',
        'a-z': name,
        'z-a': -name
    }
    const sortKey = sortOptions[sort] || sortOptions.newest;

    //Setup pagination
    const pageNum = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (pageNum - 1) * limit;
    
    const events = await Event.find(queryObj).sort(sortKey).skip(skip).limit(limit);

    
    const totalEvents = await Event.countDocuments(queryObj);
    const numOfPages = Math.ceil(totalEvents / limit);
    res.status(StatusCodes.OK).json({totalEvents, numOfPages, currentPage: pageNum, events });
};

export const createEvent = async (req, res) => {
    req.body.createdBy = req.user.userId;
    if(req.body.participants && req.body.participants.length > 0) {
        const participants = req.body.participants;
        const existUsers = await User.find({ email: { $in: participants } });
        const existUserEmails = new Set(existUsers.map(user => user.email));
        const missingEmails = participants.filter(email => !existUserEmails.has(email));
        const participantUser = existUsers.map(user => (user._id));

        if (missingEmails.length > 0) {
            throw new BadRequestError(`Emails not registered: ${missingEmails.join(', ')}`);
        }
        req.body.participants = participantUser;
    }
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({event});
};

export const getEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.status(StatusCodes.OK).json({event});
};

export const deleteEvent = async (req, res) => {
    const removedEvent = await Event.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({msg: "Job is deleted", event: removedEvent});
};

export const updateEvent = async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(StatusCodes.OK).json({msg: "Event is updated successfully", event: updatedEvent});
};
