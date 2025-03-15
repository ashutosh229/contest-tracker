import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ["Codeforces", "CodeChef"], //removed the leetcode from here
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  solutionUrl: String,
  isBookmarked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Contest", contestSchema);
