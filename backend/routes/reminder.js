import express from "express";
import {
  createReminder,
  deleteReminder,
  getReminders,
  sendReminders,
} from "../controllers/reminderController.js";

const reminderRouter = express.Router();

reminderRouter.post("/create", createReminder);
reminderRouter.delete("/:id", deleteReminder);
reminderRouter.get("/", getReminders);
reminderRouter.post("/send", sendReminders);

export default reminderRouter;
