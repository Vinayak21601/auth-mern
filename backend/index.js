import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config({ path: "../.env" });

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.error("Something went wrong:", err.message);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.get("/", (req, res) => {
  res.json({
    message: "Api is working",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//error message middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
