import Reminder from "../models/reminder.js";
import sendEmail from "../services/sendEmail.js";
import sendSMS from "../services/sendSms.js";
import Contest from "../models/contest.js";

// Create a new reminder (working)
export const createReminder = async (req, res) => {
  try {
    const { email, phoneNumber, platforms, reminderTime, notificationMethod } =
      req.body;

    if (!platforms || platforms.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one platform must be selected.",
      });
    }

    if (!reminderTime || reminderTime < 1) {
      return res.status(400).json({
        status: false,
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
      .status(200)
      .json({ status: true, message: "Reminder created successfully!" });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Get all reminders (working)
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json({ status: true, data: reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Delete a reminder (working)
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    await Reminder.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "Reminder deleted successfully!" });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

//working
export const sendReminders = async (_req, res) => {
  try {
    const now = new Date();

    // Fetch upcoming contests and group them by platform
    const contests = await Contest.find({
      startTime: { $gte: now.toISOString() },
    });

    if (!contests.length) {
      return res
        .status(200)
        .json({ status: true, message: "No upcoming contests." });
    }

    const contestMap = new Map();

    for (const contest of contests) {
      if (!contestMap.has(contest.platform)) {
        contestMap.set(contest.platform, []);
      }
      contestMap.get(contest.platform).push(contest);
    }

    // Fetch all reminders
    const reminders = await Reminder.find();

    for (const reminder of reminders) {
      const nowTime = now.getTime();

      // Get contests for the platforms the user subscribed to
      const relevantContests = reminder.platforms
        .flatMap((platform) => contestMap.get(platform) || [])
        .filter((contest) => {
          const timeUntilContest =
            (new Date(contest.startTime).getTime() - nowTime) / (1000 * 60);
          return timeUntilContest <= reminder.reminderTime;
        });

      // Send notifications only for filtered contests
      for (const contest of relevantContests) {
        if (reminder.notificationMethod === "email") {
          await sendEmail(reminder.email, contest);
        } else if (reminder.notificationMethod === "sms") {
          await sendSMS(reminder.phoneNumber, contest);
        }
      }
    }

    res.status(200).json({ status: true, message: "Reminders sent!" });
  } catch (error) {
    console.error("Error sending reminders:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
