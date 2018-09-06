import { Router, Request, Response } from "express";
import * as express from "express";
import { IThreadDocument, IThread } from "../models/Thread";
import Board from "../models/Board";
import { IPostDocument } from "../models/Post";
import Thread from "../models/Thread";
import { findThreadInBoard, getAllThreads } from "../lib/apiService";
import {
  BoardNotFoundError,
  ThreadNotFoundError
} from "../lib/apiServiceExceptions";
import { pickValuesFromPost, pickValuesfromThread } from "../utils/utils";

export default class ApiController {
  public createNewThread = (req: Request, res: Response) => {
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
          console.log(e);
          res.status(400).json({
            errors: e.errors
          });
        });
    });
  };

  public findAllThreads = async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    try {
      const threads: IThread[] = await getAllThreads(boardName);
      const populatedThreads: IThread[] = await Promise.all(
        threads.map(t => t.populateThread())
      );
      res.status(200).send(populatedThreads);
    } catch (e) {
      if (!(e instanceof BoardNotFoundError)) {
        throw e;
      }
      res.status(400).json({
        errors: e
      });
    }
  };

  public findThread = async (req: Request, res: Response) => {
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
      console.log(e);
      res.status(400).json({
        error: e.message
      });
    }
  };

  public createNewPost = async (req: Request, res: Response) => {
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
          console.log(e);
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
  };
}
