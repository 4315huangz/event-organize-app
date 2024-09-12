import mongoose from "mongoose";
import { EVENT_STATUS } from "../utils/constants.js";

const EventScheme = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: String,
    date: Date,
    eventHost: String,
    participants: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }],
    eventStatus: {
      type: String,
      enum: Object.values(EVENT_STATUS),
      default: EVENT_STATUS.SCHEDULED,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);
export default mongoose.model("Event", EventScheme);
