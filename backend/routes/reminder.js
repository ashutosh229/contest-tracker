import express from "express";

const reminderRouter = express.Router();

reminderRouter.post("/create");
reminderRouter.delete("/:id");
reminderRouter.get("/");
reminderRouter.post("/send");

export default reminderRouter;
