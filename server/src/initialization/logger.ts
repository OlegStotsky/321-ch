import morgan from "morgan";
import { Application } from "express";
import { LoggerStream } from "../config/winston";

export default (app: Application) =>
  app.use(morgan("combined", { stream: new LoggerStream() }));
