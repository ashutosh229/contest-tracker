import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contest" }],
});

export default mongoose.model("User", userSchema);
