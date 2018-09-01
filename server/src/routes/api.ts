import { Router, Request, Response } from "express";
import ApiController from "../controllers/apiController";

const apiRouter: Router = Router();
const apiController = new ApiController();

apiRouter.post("/:board_name/", apiController.createNewThread);
apiRouter.get("/:boardName/:threadNumber", apiController.findThread);
apiRouter.post("/:boardName/:threadNumber/", apiController.createNewPost);

export default apiRouter;
