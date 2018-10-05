import { Router, Request, Response } from "express";
import * as express from "express";
import * as path from "path";
import config from "../config/config";
import { IThreadDocument, IThread } from "../models/Thread";
import Board from "../models/Board";
import { IPostDocument } from "../models/Post";
import Thread from "../models/Thread";
import { findThreadInBoard, getAllThreads } from "../services/apiService";
import { pickValuesFromPost, pickValuesfromThread } from "../utils/utils";
import { logger } from "../config/winston";
import { errorHandler } from "../lib/errorHandler";
import * as FileService from "../services/fileService";
import { readFile } from "mz/fs";

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
        .then((thread: IThread) => {
          thread
            .populate("opPost")
            .execPopulate()
            .then(populatedThread => {
              res.status(201).json(pickValuesFromPost(populatedThread.opPost));
            });
        })
        .catch(e => {
          errorHandler(e);
          res.status(500).send();
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
      errorHandler(e);
      res.status(400).json({
        errors: e.description
      });
    }
  };

  public findThread = async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    const threadNumber: number = parseInt(req.params.threadNumber, 10);
    try {
      const thread = await findThreadInBoard(boardName, threadNumber);
      thread
        .populateThread()
        .then(t => t.loadImages())
        .then((populatedThread: IThread) => {
          res.status(200).send(pickValuesfromThread(populatedThread));
        });
    } catch (e) {
      errorHandler(e);
      res.status(400).json({
        error: e.description
      });
    }
  };

  public createNewPost = async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    const threadNumber: number = parseInt(req.params.threadNumber, 10);
    const { authorName, content } = req.body;
    const { fileName, data } = req.body.file;
    await FileService.savePostImageToDisk(fileName, data);
    try {
      const thread: IThread = await findThreadInBoard(boardName, threadNumber);
      thread
        .addPost({ authorName, content, imageName: fileName })
        .then(newPost => {
          res.status(201).json(pickValuesFromPost(newPost));
        })
        .catch(e => {
          errorHandler(e);
          res.status(400).json({
            errors: ["Something went wrong"]
          });
        });
    } catch (e) {
      errorHandler(e);

      res.status(400).json({
        error: e.description
      });
    }
  };
}
