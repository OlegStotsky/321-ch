import { Router, Request, Response } from "express";
import ApiController from "../controllers/apiController";

const apiRouter: Router = Router();
const apiController = new ApiController();

apiRouter.get("/:boardName/:threadNumber", apiController.findThread);
apiRouter.get("/:boardName/", apiController.findAllThreads);
apiRouter.post("/:board_name/", apiController.createNewThread);
apiRouter.post("/:boardName/:threadNumber/", apiController.createNewPost);

export default apiRouter;
