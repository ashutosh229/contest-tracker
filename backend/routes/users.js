import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Create or update user preferences
router.post("/preferences", async (req, res) => {
  try {
    const { email, preferences } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { preferences },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (error) {
    console.log("post route users");
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
