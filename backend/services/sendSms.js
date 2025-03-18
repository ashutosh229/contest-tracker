import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, contest) => {
  try {
    await client.messages.create({
      body: `Reminder: ${contest.platform} contest "${contest.name}" starts at ${contest.startTime}. Be ready!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`Reminder SMS sent to ${to}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export default sendSMS;
