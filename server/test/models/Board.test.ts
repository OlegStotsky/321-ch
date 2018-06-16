import * as mongoose from "mongoose";
import * as moment from "moment";
import Board, { IBoardDocument, IBoard } from "../../src/models/Board";
import config from "../../src/config/config";

describe("Board", () => {
  beforeAll(() => {
    return mongoose.connect(config["mongo-test-uri"]);
  });

  it("Creates board", async () => {
    const boardData = {
      name: "b"
    };
    const board = new Board(boardData);
    const res = await board.save();
    expect(res).toMatchObject(boardData);
  });

  it("Adds thhread to the existing board", async () => {
    const board: IBoard = await Board.findOne({ name: "b" });
    const opPost = {
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    };
    const res = await board.addThread(opPost);
    expect(res.threads.length).toEqual(1);
    expect(res.threads[0].opPost.authorName).toEqual("Oleg");
    expect(res.threads[0].opPost.subject).toEqual("Serious Business");
    expect(res.threads[0].opPost.content).toEqual("Hello there!");
    expect(res.threads[0].opPost.date / 10e6).toBeCloseTo(moment.now() / 10e6, 2);
  });

  afterAll(() => {
    mongoose.connection.collections.boards.drop();
    mongoose.connection.close();
  });
});