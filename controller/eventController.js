import { nanoid } from "nanoid";
import Event from "../models/EventModels.js";


export const getAllEvents = async (req, res) => {
    res.status(200).json({events});
};

export const getEvent = async (req, res) => {
    const {id} = req.params;
    const event = events.find((event) => event.id === id);
    if(!event) {
        return res.status(404).json({msg: `Not find event with id ${id}`});
    }
    res.status(200).json({event});
};

export const createEvent = async (req, res) => {
    const { name, location } = req.body;
    const event = await Event.create({name, location});
    res.status(201).json({event});
};

export const deleteEvent = async (req, res) => {
    const {id} = req.params;
    const event = events.find((event) => event.id === id);
    if(!event) {
        return res.status(404).json({msg: `Not find evnet with id ${id}`})
    }
    const newEvents = events.filter((event) => event.id !== id);
    events = newEvents;
    res.status(200).json({msg: "Job is deleted"});
};

export const updateEvent = async (req, res) => {
    const { name, location } = req.body;
    if(!name || !location) {
        return res.status(400).json({msg: "Please provide name and location" });
    }
    const {id} = req.params;
    const event = events.find((event) => event.id === id);
    if(!event) {
        return res.status(404).json({msg: `Not find evnet with id ${id}`})
    }
    event.name = name;
    event.location = location;
    res.status(200).json({msg: "Event is updated successfully"});
};
