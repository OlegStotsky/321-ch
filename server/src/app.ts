import * as path from "path";
import express from "express";
import mongoose from "mongoose";
import config from "./config/config";
import apiRouter from "./routes/api";
import * as bodyParser from "body-parser";
import morganBody from "morgan-body";
import morgan from "morgan";
import Thread from "./models/thread";
import Board from "./models/Board";
import BoardName from "../../shared/lib/types/BoardName";

const app = express();

app.use(bodyParser.json());
morganBody(app);

console.log("env: ", process.env.NODE_ENV);

mongoose.connect(config["mongo-uri"]);
mongoose.connection.once("connected", () => {
  console.log("Connected to database");
});

Promise.all(
  Object.keys(BoardName).map(key => {
    return Board.create({ name: BoardName[key as any] });
  })
);

const distPath = path.join(__dirname, "..", "..", "client", "dist");
console.log(distPath);
app.use(express.static(distPath));

app.use("/api", apiRouter);

export default app;
