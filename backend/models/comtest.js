import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  platform: String,
  name: String,
  date: Date,
  duration: Number,
  url: String,
  status: { type: String, enum: ["upcoming", "past"], default: "upcoming" },
});

export default mongoose.model("Contest", contestSchema);
