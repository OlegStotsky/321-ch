import { Router, Request, Response } from "express";
import * as express from "express";
import { IThreadDocument, IThread } from "../models/Thread";
import Board from "../models/Board";
import { IPostDocument } from "../models/Post";
import Thread from "../models/Thread";
import { findThreadInBoard } from "../lib/apiService";
import {
  BoardNotFoundError,
  ThreadNotFoundError
} from "../lib/apiServiceExceptions";
import { pickValuesFromPost, pickValuesfromThread } from "../utils/utils";
import ApiController from "../controllers/apiController";

const apiRouter: Router = Router();
const apiController = new ApiController();

apiRouter.post("/:board_name/", apiController.createNewThread);
apiRouter.get("/:boardName/:threadNumber", apiController.findThread);
apiRouter.post("/:boardName/:threadNumber/", apiController.createNewPost);

export default apiRouter;
