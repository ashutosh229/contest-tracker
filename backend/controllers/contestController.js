import Contest from "../models/contest.js";
import { contestFetcher } from "../services/contestsFetcher.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import fetchSolutionsFromPlaylist from "../services/solutionLinkFetcher.js";

configDotenv({
  path: "../.env",
});

const codechefPlaylistId = process.env.CODECHEF_PLAYLIST;
const codeforcesPlaylistId = process.env.CODEFORCES_PLAYLIST;

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

export const getContestSolution = async (req, res) => {
  try {
    const { platform, contestName } = req.query;

    let playlistId;
    if (platform === "CodeChef") playlistId = codechefPlaylistId;
    else if (platform === "Codeforces") playlistId = codeforcesPlaylistId;
    else
      return res.status(400).json({ status: false, error: "Invalid platform" });

    const result = await fetchSolutionsFromPlaylist(playlistId, contestName);
    if (result.state === 1)
      return res.status(200).json({
        status: false,
        message: "Solution is not available on Youtube",
        solutionLink: result.solutionLink,
      });
    else if (result.state === 2) {
      return res.status(200).json({
        status: false,
        message: "Video ID is not available",
        solutionLink: result.solutionLink,
      });
    } else if (result.state === 3) {
      return res.status(200).json({
        status: true,
        solutionLink: result.solutionLink,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        solutionLink: result.solutionLink,
      });
    }
  } catch (error) {
    console.log("Error fetching the solution from youtube", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
