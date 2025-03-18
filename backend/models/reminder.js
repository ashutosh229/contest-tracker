import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: function () {
      return this.notificationMethod === "email";
    },
  },
  phoneNumber: {
    type: String,
    required: function () {
      return this.notificationMethod === "sms";
    },
  },
  platforms: { type: [String], required: true }, // Allow multiple platforms
  reminderTime: { type: Number, min: 1, required: true }, // Custom time (in minutes)
  notificationMethod: { type: String, enum: ["email", "sms"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reminder", ReminderSchema);
