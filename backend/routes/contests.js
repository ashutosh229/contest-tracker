import express from "express";
import Contest from "../models/contest.js";

const router = express.Router();

// Get all contests
router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find();
    res.json(contests);
  } catch (error) {
    console.log("Get route contests");
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Toggle bookmark
router.post("/:id/bookmark", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    contest.isBookmarked = !contest.isBookmarked;
    await contest.save();
    res.json(contest);
  } catch (error) {
    console.log("post route contests");
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
