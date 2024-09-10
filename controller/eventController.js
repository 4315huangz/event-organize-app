import Event from "../models/EventModels.js";
import { StatusCodes } from "http-status-codes";

export const getAllEvents = async (req, res) => {
    const {name, location, eventStatus, sort} = req.query;
    const queryObj = {createdBy: req.user.userId};
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
    if(eventStatus && eventStatus !== 'all') {
        queryObj.eventStatus = { $regex: new RegExp(eventStatus, 'i') };;
    }

    const sortOptions = {
        newest: '-date',
        oldest: 'date',
        'a-z': name,
        'z-a': -name
    }
    const sortKey = sortOptions[sort] || sortOptions.newest;

    console.log(queryObj);
    const events = await Event.find(queryObj).sort(sortKey);
    res.status(StatusCodes.OK).json({ events });
};

export const createEvent = async (req, res) => {
    req.body.createdBy = req.user.userId;
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
