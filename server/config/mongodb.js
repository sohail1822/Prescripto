import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("MongoDB connected successfully")
  );
  mongoose.connection.on("error", (err) =>
    console.log("MongoDB connection failed", err)
  );

  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
};

export default connectDB;
