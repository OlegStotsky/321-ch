import { Router, Request, Response } from "express";
import * as express from "express";
import * as path from "path";
import { badRequest, badImplementation } from "boom";

import config from "../config/config";

import { IThreadDocument, IThread } from "../models/Thread";
import Board from "../models/Board";
import { IPostDocument } from "../models/Post";
import Thread from "../models/Thread";

import { findThreadInBoard, getAllThreads } from "../services/apiService";
import { pickValuesFromPost, pickValuesfromThread } from "../utils/utils";

import { logger } from "../config/winston";
import * as FileService from "../services/fileService";
import BoardNotFoundError from "../lib/BoardNotFoundError";
import ThreadNotFoundError from "../lib/ThreadNotFoundError";

export default class ApiController {
  public createNewThread = (req: Request, res: Response) => {
    const { opPostAuthor, opPostSubject, opPostContent } = req.body;
    const { name: fileName, data } = req.body.opPostFile;
    Board.findOne({ name: req.params.board_name }).then(async board => {
      if (!board) {
        throw badRequest(`Board ${req.params.board_name} doesn't exist`);
      }

      const imageUri: string = await FileService.savePostImageToDisk(
        fileName,
        data
      );
      board
        .addThread({
          opPostAuthor,
          opPostContent,
          opPostSubject,
          opPostImageUri: imageUri
        })
        .then((thread: IThread) => {
          thread
            .populate("opPost")
            .execPopulate()
            .then(populatedThread => {
              res.status(201).json(pickValuesFromPost(populatedThread.opPost));
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
    } catch (err) {
      if (err instanceof BoardNotFoundError) {
        throw badRequest(err.message);
      }

      throw badImplementation(err);
    }
  };

  public findThread = async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    const threadNumber: number = parseInt(req.params.threadNumber, 10);
    try {
      const thread = await findThreadInBoard(boardName, threadNumber);
      thread.populateThread().then((populatedThread: IThread) => {
        res.status(200).send(pickValuesfromThread(populatedThread));
      });
    } catch (err) {
      if (err instanceof BoardNotFoundError) {
        throw badRequest(err.message);
      }
      if (err instanceof ThreadNotFoundError) {
        throw badRequest(err.message);
      }

      throw badImplementation(err);
    }
  };

  public createNewPost = async (req: Request, res: Response) => {
    const boardName: string = req.params.boardName;
    const threadNumber: number = parseInt(req.params.threadNumber, 10);
    const { authorName, content } = req.body;
    const { name: fileName, data } = req.body.file;
    const imageUri: string = await FileService.savePostImageToDisk(
      fileName,
      data
    );
    try {
      const thread: IThread = await findThreadInBoard(boardName, threadNumber);
      thread.addPost({ authorName, content, imageUri }).then(newPost => {
        res.status(201).json(pickValuesFromPost(newPost));
      });
    } catch (err) {
      if (err instanceof BoardNotFoundError) {
        throw badRequest(err.message);
      }
      if (err instanceof ThreadNotFoundError) {
        throw badRequest(err.message);
      }

      throw badImplementation(err);
    }
  };
}
