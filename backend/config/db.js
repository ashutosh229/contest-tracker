import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection is successfull");
  } catch (error) {
    console.error(error);
    console.log("Could not connect to the database");
    process.exit(1);
  }
};

export default connectDB;
