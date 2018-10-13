import * as path from "path";
import express, { NextFunction } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import apiRouter from "./routes/api";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import Board from "./models/Board";
import BoardName from "../../shared/lib/types/BoardName";
import { LoggerStream, logger } from "./config/winston";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
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
const staticPath = path.join(__dirname, "..", "static");
app.use(express.static(distPath));

app.use("/api", apiRouter);

app.get("/images/:image_name", (req, res) => {
  logger.debug(path.join(staticPath, req.params.image_name));
  res.sendFile(path.join(staticPath, req.params.image_name));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.use(errorHandler);

export default app;
