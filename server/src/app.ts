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
import { LoggerStream, logger } from "./config/winston";

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined", { stream: new LoggerStream() }));

mongoose.connect(config["mongo-uri"]);
mongoose.connection.once("connected", () => {
  logger.info("Connected to database");
});

Promise.all(
  Object.keys(BoardName).map(key => {
    Board.find({ name: BoardName[key as any] })
      .then(board => {
        return Board.create({ name: BoardName[key as any] });
      })
      .catch(e => {
        logger.silly(e);
      });
  })
);

const distPath = path.join(__dirname, "..", "..", "client", "dist");
app.use(express.static(distPath));

app.use((req: any, res: any, next: any) => {
  logger.info(req.body);
  next();
});
app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
