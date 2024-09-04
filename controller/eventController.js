import Event from "../models/EventModels.js";
import { StatusCodes } from "http-status-codes";

export const getAllEvents = async (req, res) => {
    const events = await Event.find({createdBy: req.user.userId});
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
    const removedEvent = await Event.findByIdAndDelete(req.params);
    res.status(StatusCodes.OK).json({msg: "Job is deleted", event: removedEvent});
};

export const updateEvent = async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(req.params, req.body, {new: true});
    res.status(StatusCodes.OK).json({msg: "Event is updated successfully", event: updatedEvent});
};
