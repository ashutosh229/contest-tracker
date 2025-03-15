import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contestRoutes from "./routes/contests.js";
import userRoutes from "./routes/users.js";
import { fetchContests } from "./services/contestFetcher.js";
import cron from "node-cron";

//loading the env variables
dotenv.config();

//connecting the database
connectDB();

//making the app object
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

//routes
app.use("/api/contests", contestRoutes);
app.use("/api/users", userRoutes);

// Fetch contests every hour
cron.schedule("0 * * * *", async () => {
  try {
    await fetchContests();
    console.log("Contests fetched successfully");
  } catch (error) {
    console.log("Error fetching contests:", error);
  }
});

// Check for new YouTube solutions every 6 hours
cron.schedule("0 */6 * * *", async () => {
  try {
    await updateYoutubeSolutions();
    console.log("YouTube solutions updated successfully");
  } catch (error) {
    console.log("Error updating YouTube solutions:", error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
