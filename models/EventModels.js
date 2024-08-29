import mongoose from "mongoose";

const EventScheme = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    location: String,
    date: Date,
    eventHost: String,
    organizerEmail: String,
    evnetStatus: {
      type: String,
      enum: ["Completed", "Scheduled", "Canceled", "Postponed"],
      default: "Scheduled",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventScheme);
