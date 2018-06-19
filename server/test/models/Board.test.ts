import * as mongoose from "mongoose";
import * as moment from "moment";
import Board, { IBoardDocument, IBoard } from "../../src/models/Board";
import Thread, { IThread } from "../../src/models/Thread";
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
    const thread = await board.addThread(opPost);
    expect(board.threads.length).toEqual(1);
    expect(board.threads[0].opPost.postNumber).toEqual(1);
    expect(board.threads[0].opPost.authorName).toEqual("Oleg");
    expect(board.threads[0].opPost.subject).toEqual("Serious Business");
    expect(board.threads[0].opPost.content).toEqual("Hello there!");
    expect(board.threads[0].opPost.date / 10e6).toBeCloseTo(
      moment.now() / 10e6,
      2
    );
  });

  it("Creates new board, creates threads and posts in them with correct post numbers", async () => {
    const board = new Board({ name: "pr" });
    const thread = await board.addThread({
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    });
    expect(board.threads.length).toEqual(1);
    expect(board.threads[0].opPost.postNumber).toEqual(1);
    await thread.addPost({
      authorName: "Vasya",
      content: "How are you?"
    });
    expect(thread.posts[0].postNumber).toEqual(2);
    await thread.addPost({
      authorName: "Kolya",
      content: "Fine, how are you?"
    });
    expect(thread.posts.length).toEqual(2);
    expect(thread.posts[1].postNumber).toEqual(3);
  });

  it("Creates 2 board and their post numbers don't clash", async () => {
    const boardA = new Board({ name: "a" });
    const boardSci = new Board({ name: "sci" });
    await boardSci.save();
    const thread1 = await boardSci.addThread({
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    });
    expect(thread1.opPost.postNumber).toEqual(1);
    const thread2 = await boardA.addThread({
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    });
    expect(thread2.opPost.postNumber).toEqual(1);
    const post1 = await thread1.addPost({
      authorName: "anon",
      content: "hahaha"
    });
    const post2 = await thread2.addPost({
      authorName: "vasya",
      content: "abcd"
    });
    expect(post1.postNumber).toEqual(2);
    expect(post2.postNumber).toEqual(2);
  });

  it("Finds thread by thread number", async () => {
    const boardSci = await Board.findOne({ name: "sci" });
    const thread = await boardSci.findThreadByOpPostNumber(1);
    expect(thread.opPost).toMatchObject({
      authorName: "Oleg",
      subject: "Serious Business",
      content: "Hello there!"
    });
  });

  afterAll(async () => {
    await mongoose.connection.collections.boards.drop();
    const keys = Object.keys(mongoose.connection.collections);
    for (const key of keys) {
      if (key.match(/^.*seqs$/)) {
        await mongoose.connection.collections[key].drop();
      }
    }
    mongoose.disconnect();
  });
});
