import path from "path";
import { Application } from "express";

import apiRouter from "../routes/api";
import imagesRouter from "../routes/images";
import { logger } from "../config/winston";

export default (app: Application) => {
  app.use("/api", apiRouter);
  app.use("/images", imagesRouter);
  logger.info("Initialized routes");
};
