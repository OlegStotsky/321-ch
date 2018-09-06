import * as path from "path";
import express, { NextFunction } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import apiRouter from "./routes/api";
import * as bodyParser from "body-parser";
// import morganBody from "morgan-body";
import morgan from "morgan";
import Board from "./models/Board";
import BoardName from "../../shared/lib/types/BoardName";

const app = express();

app.use(bodyParser.json());
app.use(morgan("common"));

mongoose.connect(config["mongo-uri"]);
mongoose.connection.once("connected", () => {
  console.log("Connected to database");
});

Promise.all(
  Object.keys(BoardName).map(key => {
    Board.find({ name: BoardName[key as any] }).then(board => {
      return Board.create({ name: BoardName[key as any] });
    });
  })
);

const distPath = path.join(__dirname, "..", "..", "client", "dist");
app.use(express.static(distPath));

app.use((req: any, res: any, next: any) => {
  console.log(req.body);
  next();
});
app.use("/api", apiRouter);
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  console.log(req.body);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
