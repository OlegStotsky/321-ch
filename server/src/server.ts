import { badImplementation } from "boom";

import initApp from "./app";
import { logger } from "./config/winston";

(async () => {
  const app = await initApp();
  app.listen(process.env.PORT || 3000, () => {
    logger.info("listening on 3000");
  });
})();

process.on("uncaughtException", err => {
  logger.error(err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  logger.error(err);
  process.exit(1);
});
