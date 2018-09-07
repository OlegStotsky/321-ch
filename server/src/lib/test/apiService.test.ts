import * as sinon from "sinon";
import { findThreadInBoard } from "../apiService";
import Thread from "../../models/Thread";
import Board from "../../models/Board";
import { AppError } from "../appError";

describe("api service", () => {
  const boardFixtures = [
    {
      name: "b",
      lastPostNumber: 1,
      _id: 1
    }
  ];
  const threadFixtures = [
    {
      opPostNumber: 1,
      boardId: 1
    }
  ];
  const threadStub = sinon
    .stub(Thread, "findOne")
    .callsFake(({ boardId, opPostNumber }) => {
      return Promise.resolve(
        threadFixtures.find(
          t => t.boardId === boardId && t.opPostNumber === opPostNumber
        )
      );
    });
  const boardStub = sinon.stub(Board, "findOne").callsFake(({ name }) => {
    return Promise.resolve(boardFixtures.find(b => b.name === name));
  });

  describe("find thread in board", () => {
    it("finds thread in board for valid data", async () => {
      const thread = await findThreadInBoard("b", 1);
      expect(thread.opPostNumber).toEqual(1);
      expect(thread.boardId).toEqual(1);
    });
    it("throws BoardNotFoundError if board doesn't exist", async () => {
      expect(findThreadInBoard("sci", 1)).rejects.toBeInstanceOf(AppError);
    });
    it("throws ThreadNotFoundError if thread doesn't exist", async () => {
      expect(findThreadInBoard("b", 2)).rejects.toBeInstanceOf(AppError);
    });
  });
});
