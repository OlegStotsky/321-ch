import { Router, Request, Response } from "express";
import * as express from "express";
import * as R from "ramda";
import { IThreadDocument } from "../models/Thread";
import Board from "../models/Board";
import { IPostDocument } from "../models/Post";
import Thread from "../models/Thread";

const apiRouter: Router = Router();

const pickValuesFromPost = (post: IPostDocument) => {
  return R.pick(
    ["date", "authorName", "content", "subject", "postNumber"],
    post
  );
};

const pickValuesfromThread = (thread: IThreadDocument) => {
  return R.evolve(
    { opPost: pickValuesFromPost, posts: R.map(pickValuesFromPost) },
    R.pick(["posts", "opPost"], thread)
  );
};

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
        res.status(500).json(e);
        console.log("Error: ", e);
      });
  });
});

apiRouter.get("/:boardName/:threadNumber", (req: Request, res: Response) => {
  const boardName: string = req.params.boardName;
  const threadNumber: number = parseInt(req.params.threadNumber, 10);
  Board.findOne({ name: boardName })
    .then(board => {
      if (!board) {
        res.status(400).json({
          errors: "Board doesn't exist"
        });
        return;
      }

      Thread.findOne({ opPostNumber: threadNumber, board: board._id }).then(
        thread => {
          if (!thread) {
            res.status(400).json({
              errors: "Thread doesn't exist"
            });
          }

          thread.populateThread().then(populatedThread => {
            res.status(200).send(pickValuesfromThread(thread));
          });
        }
      );
    })
    .catch(e => {
      res.status(500).send(e);
      console.log("Error :", e);
    });
});

apiRouter.post("/:boardName/:threadNumber/", (req: Request, res: Response) => {
  const boardName: string = req.params.boardName;
  const threadNumber: number = parseInt(req.params.threadNumber, 10);
  Board.findOne({ name: boardName }).then(board => {
    if (!board) {
      res.status(400).json({
        errors: "Board doesn't exist"
      });
      return;
    }

    Thread.findOne({ opPostNumber: threadNumber, board: board._id }).then(
      thread => {
        if (!thread) {
          res.status(400).json({
            errors: "Thread doesn't exist"
          });
          return;
        }

        thread
          .addPost(req.body)
          .then(newPost => {
            res.status(201).json(pickValuesFromPost(newPost));
          })
          .catch(e => {
            console.log("Error: ", e);
            res.status(400).json({
              e
            });
          });
      }
    );
  });
});

export default apiRouter;
