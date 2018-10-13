import mongoose from "mongoose";
import config from "../config/config";
import { logger } from "../config/winston";

export default () => {
  mongoose.connect(config["mongo-uri"]);
  mongoose.connection.once("connected", () => {
    logger.info("Initialized database");
  });
};
