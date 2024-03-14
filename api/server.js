import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.models.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected successfully");
  } catch (err) {
    console.log(err);
  }
};
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});
app.listen(8080, () => {
  connect();
  console.log("Backned Server is running");
});
