import { Router, Request, Response } from "express";
import express from "express";

const apiRouter: express.Router = express.Router();

apiRouter.get("/:board_name/:thread_id", (req: Request, res : Response) => {
  
});