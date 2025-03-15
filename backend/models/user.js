import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    platforms: [
      {
        type: String,
        enum: ["Codeforces", "CodeChef"], //removed the leetcode from here
      },
    ],
    reminderTiming: [Number],
    reminderType: [
      {
        type: String,
        enum: ["email", "sms"],
      },
    ],
  },
});

export default mongoose.model("User", userSchema);
