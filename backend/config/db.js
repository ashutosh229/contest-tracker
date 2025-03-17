import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection is successfull");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to the database");
    process.exit(1);
  }
};

export default connectDB;
