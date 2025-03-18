import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const backendDomain = process.env.BACKEND_DOMAIN;

cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("Running reminder cron job...");
    const response = await fetch(`${backendDomain}/api/reminders/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to send reminders: ${response.statusText}`);
    }
    console.log("Reminders checked and sent.");
  } catch (error) {
    console.error("Error running reminder cron job:", error);
  }
});
