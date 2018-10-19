import express from "express";

import bodyParser from "body-parser";

import initDB from "./initialization/db";
import initLogger from "./initialization/logger";
import createBoards from "./initialization/createBoards";
import initStatic from "./initialization/initStatic";
import initRoutes from "./initialization/initRoutes";

import errorHandler from "./middleware/errorHandler";

const init = async () => {
  const app = express();

  app.use(bodyParser.json({ limit: "5mb" }));

  await initLogger(app);

  await initDB();

  await createBoards();

  // important to initialize routes before static content handler
  await initRoutes(app);

  await initStatic(app);

  app.use(errorHandler);

  return app;
};

export default init;
