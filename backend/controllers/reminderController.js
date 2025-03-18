import { Request, Response } from "express";
import reminder
import sendEmail from "../utils/emailService";
import sendSMS from "../utils/smsService";
import Contest from "../models/Contest"; // Assuming a Contest model exists

// Create a new reminder
export const createReminder = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, platforms, reminderTime, notificationMethod } =
      req.body;

    if (!platforms || platforms.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "At least one platform must be selected.",
        });
    }

    if (!reminderTime || reminderTime < 1) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Reminder time must be at least 1 minute.",
        });
    }

    const newReminder = new Reminder({
      email,
      phoneNumber,
      platforms,
      reminderTime,
      notificationMethod,
    });

    await newReminder.save();
    return res
      .status(201)
      .json({ success: true, message: "Reminder created successfully!" });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all reminders
export const getReminders = async (req: Request, res: Response) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json({ success: true, reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a reminder
export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Reminder.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Reminder deleted successfully!" });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Send Reminders (Manually Triggered or via Cron Job)
export const sendReminders = async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const contests = await Contest.find({ startTime: { $gte: now } }); // Get upcoming contests

    const reminders = await Reminder.find();
    for (const reminder of reminders) {
      for (const contest of contests) {
        if (reminder.platforms.includes(contest.platform)) {
          const timeUntilContest =
            (contest.startTime.getTime() - now.getTime()) / (1000 * 60);
          if (timeUntilContest <= reminder.reminderTime) {
            if (reminder.notificationMethod === "email") {
              await sendEmail(reminder.email, contest);
            } else if (reminder.notificationMethod === "sms") {
              await sendSMS(reminder.phoneNumber, contest);
            }
          }
        }
      }
    }
    res.status(200).json({ success: true, message: "Reminders sent!" });
  } catch (error) {
    console.error("Error sending reminders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
