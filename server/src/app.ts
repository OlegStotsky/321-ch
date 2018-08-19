import express from "express";
import mongoose from "mongoose";
import config from "./config/config";
import apiRouter from "./routes/api";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

mongoose.connect(config["mongo-uri"]);
mongoose.connection.once("connected", () => {
  console.log("Connected to database");
});

app.use("/api", apiRouter);

export default app;