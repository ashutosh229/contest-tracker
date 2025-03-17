import Contest from "../models/contest.js";
import { contestFetcher } from "../services/contestsFetcher.js";
import mongoose from "mongoose";

export const getAllContests = async (req, res) => {
  try {
    const contests = await contestFetcher();
    if (!contests || contests.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No contests found" });
    }

    const bulkOperations = contests.map((contest) => ({
      updateOne: {
        filter: { platform: contest.platform, name: contest.name },
        update: contest,
        upsert: true,
      },
    }));

    if (bulkOperations.length > 0) {
      await Contest.bulkWrite(bulkOperations);
    }

    const allContests = await Contest.find();

    res.status(200).json({
      status: true,
      data: allContests,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const bookmarkContest = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid contest ID" });
    }
    const contest = await Contest.findById(id);
    if (!contest) {
      return res.status(404).json({
        status: false,
        message: "Contest is not available",
      });
    }
    contest.isBookmarked = !contest.isBookmarked;
    await contest.save();
    res.status(200).json({
      status: true,
      data: contest,
    });
  } catch (error) {
    console.error("Error bookmarking the contest:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
