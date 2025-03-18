import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmaill = async (to, contest) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Upcoming Contest Reminder: ${contest.name}`,
      text: `Your selected platform ${contest.platform} has a contest "${contest.name}" starting at ${contest.startTime}. Don't forget to participate!`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending the email`, error);
  }
};

export default sendEmaill;
