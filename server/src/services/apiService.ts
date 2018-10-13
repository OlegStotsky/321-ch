import { IThread } from "../models/Thread";
import Thread from "../models/Thread";
import Board from "../models/Board";
import ThreadNotFoundError from "../lib/ThreadNotFoundError";
import BoardNotFoundError from "../lib/BoardNotFoundError";

export const findThreadInBoard = (
  boardName: string,
  opPostNumber: number
): Promise<IThread> => {
  return Board.findOne({ name: boardName }).then(board => {
    if (!board) {
      throw new BoardNotFoundError(`Board ${boardName} doesn't exist`);
    }

    return Thread.findOne({ boardId: board._id, opPostNumber }).then(thread => {
      if (!thread) {
        throw new ThreadNotFoundError(
          `Thread number ${opPostNumber} doesn't exist in ${boardName}`
        );
      }

      return thread;
    });
  });
};

export const getAllThreads = (boardName: string): Promise<IThread[]> => {
  return Board.findOne({ name: boardName }).then(board => {
    if (!board) {
      throw new BoardNotFoundError(`Board ${boardName} doesn't exist`);
    }

    return Thread.find({ boardId: board._id });
  });
};
