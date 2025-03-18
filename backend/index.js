import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import contestRouter from "./routes/contest.js";
import cors from "cors";
import reminderRouter from "./routes/reminder.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contest", contestRouter);
app.use("/api/reminder", reminderRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`PORT: ${process.env.PORT}`);

  console.log(`Backend server is running on port ${port}`);
});
