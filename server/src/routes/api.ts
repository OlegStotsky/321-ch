import { Router, Request, Response } from "express";
import express from "express";
import * as R from "ramda";
import Board from "../models/Board";

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
        res
          .status(201)
          .send(
            R.pick(
              ["date", "authorName", "content", "subject", "postNumber"],
              thread.opPost
            )
          );
      })
      .catch(e => {
        res.status(500).json(e);
      });
  });
});

export default apiRouter;
