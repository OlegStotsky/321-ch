import express from "express";
import mongoose from "mongoose";
import config from "./config/config";
import apiRouter from "./routes/api";

const app = express();

mongoose.connect(config["mongo-uri"]);
mongoose.connection.once("connected", () => {
  console.log("Connected to database");
});


