import { Router, Request, Response } from "express";

import ApiController from "../controllers/apiController";
import asyncErrors from "../middleware/asyncErrors";

const apiRouter: Router = Router();
const apiController = new ApiController();

apiRouter.get(
  "/:boardName/:threadNumber",
  asyncErrors(apiController.findThread)
);
apiRouter.get("/:boardName/", asyncErrors(apiController.findAllThreads));
apiRouter.post("/:board_name/", asyncErrors(apiController.createNewThread));
apiRouter.post(
  "/:boardName/:threadNumber/",
  asyncErrors(apiController.createNewPost)
);

export default apiRouter;
