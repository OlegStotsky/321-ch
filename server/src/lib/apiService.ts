import { IThread } from "../models/Thread";
import Thread from "../models/Thread";
import Board from "../models/Board";
import { AppError } from "./appError";

export const findThreadInBoard = (
  boardName: string,
  opPostNumber: number
): Promise<IThread> => {
  return Board.findOne({ name: boardName }).then(board => {
    if (!board) {
      throw new AppError(`Board ${boardName} doesn't exist`, true);
    }

    return Thread.findOne({ boardId: board._id, opPostNumber }).then(thread => {
      if (!thread) {
        throw new AppError(
          `Thread number ${opPostNumber} doesn't exist in ${boardName}`,
          true
        );
      }

      return thread;
    });
  });
};

export const getAllThreads = (boardName: string): Promise<IThread[]> => {
  return Board.findOne({ name: boardName }).then(board => {
    if (!board) {
      throw new AppError(`Board ${boardName} doesn't exist`, true);
    }

    return Thread.find({ boardId: board._id });
  });
};
