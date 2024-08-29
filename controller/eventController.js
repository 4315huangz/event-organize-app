import { NotFoundError } from "../errors/customErrors.js";
import Event from "../models/EventModels.js";
import { StatusCodes } from "http-status-codes";

export const getAllEvents = async (req, res) => {
    const events = await Event.find({});
    res.status(StatusCodes.OK).json({ events });
};

export const createEvent = async (req, res) => {
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({event});
};

export const getEvent = async (req, res) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!event) throw new NotFoundError(`No event find with id ${id}`);
    res.status(StatusCodes.OK).json({event});
};

export const deleteEvent = async (req, res) => {
    const {id} = req.params;
    const removedEvent = await Event.findByIdAndDelete(id);
    if(!removedEvent) throw new NotFoundError(`No event find with id ${id}`);
    res.status(StatusCodes.OK).json({msg: "Job is deleted", event: removedEvent});
};

export const updateEvent = async (req, res) => {
    const {id} = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedEvent) throw new NotFoundError(`No event find with id ${id}`);
    res.status(StatusCodes.OK).json({msg: "Event is updated successfully", event: updateEvent});
};
