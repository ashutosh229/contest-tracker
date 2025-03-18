import express from "express";
import {
  bookmarkContest,
  getAllContests,
  getContestSolution,
} from "../controllers/contestController.js";

const contestRouter = express.Router();

contestRouter.get("/get_all_contests", getAllContests);
contestRouter.post("/:id/bookmark", bookmarkContest);
contestRouter.get("/contest_solution", getContestSolution);

export default contestRouter;
