import express from "express";
import {
  bookmarkContest,
  getAllContests,
} from "../controllers/contestController.js";

const contestRouter = express.Router();

contestRouter.get("/get_all_contests", getAllContests);
contestRouter.post("/:id/bookmark", bookmarkContest);

export default contestRouter;
