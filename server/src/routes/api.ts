import { Router, Request, Response } from "express";
import * as express from "express";
import * as R from "ramda";
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

const apiRouter: Router = Router();

apiRouter.post("/:board_name/", (req: Request, res: Response) => {
  const { opPostAuthor, opPostSubject, opPostContent } = req.body;
  Board.findOne({ name: req.params.board_name }).then(board => {
    if (!board) {
      res.status(400).json({
        errors: "Board doesn't exist"
      });
    }

    board
      .addThread({ opPostAuthor, opPostContent, opPostSubject })
      .then(thread => {
        thread
          .populate("opPost")
          .execPopulate()
          .then(populatedThread => {
            res.status(201).json(pickValuesFromPost(populatedThread.opPost));
          });
      })
      .catch(e => {
        res.status(400).json({
          errors: e.errors
        });
      });
  });
});

apiRouter.get(
  "/:boardName/:threadNumber",
  async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    const threadNumber: number = parseInt(req.params.threadNumber, 10);
    try {
      const thread = await findThreadInBoard(boardName, threadNumber);
      thread.populateThread().then(populatedThread => {
        res.status(200).send(pickValuesfromThread(thread));
      });
    } catch (e) {
      if (
        !(e instanceof BoardNotFoundError || e instanceof ThreadNotFoundError)
      ) {
        throw e;
      }
      res.status(400).json({
        error: e.message
      });
    }
  }
);

apiRouter.post(
  "/:boardName/:threadNumber/",
  async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    const threadNumber: number = parseInt(req.params.threadNumber, 10);
    try {
      const thread: IThread = await findThreadInBoard(boardName, threadNumber);
      thread
        .addPost(req.body)
        .then(newPost => {
          res.status(201).json(pickValuesFromPost(newPost));
        })
        .catch(e => {
          res.status(400).json({
            errors: ["Something went wrong"]
          });
        });
    } catch (e) {
      if (
        !(e instanceof BoardNotFoundError || e instanceof ThreadNotFoundError)
      ) {
        throw e;
      }
      res.status(400).json({
        error: e.message
      });
    }
  }
);

export default apiRouter;
