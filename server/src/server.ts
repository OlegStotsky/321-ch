import { badImplementation } from "boom";

import app from "./app";
import { logger } from "./config/winston";

process.on("uncaughtException", err => {
  logger.error(err);
});

process.on("unhandledRejection", err => {
  logger.error(err);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
