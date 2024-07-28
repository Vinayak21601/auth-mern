import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log("Something went wrong");
  });
const app = express();

app.listen(3001, () => {
  console.log("Server listening on port 3000");
});
