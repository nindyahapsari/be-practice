import mongoose from "mongoose";

export function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .then((err) => console.error("Could not connect to Mongodb", err));
}
