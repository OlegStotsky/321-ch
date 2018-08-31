import * as mongoose from "mongoose";
import * as moment from "moment";
import Board, { IBoardDocument, IBoard } from "../../src/models/Board";
import Thread, { IThread } from "../../src/models/Thread";
import config from "../../src/config/config";

describe("Board", () => {
  beforeAll(async () => {
    await mongoose.connect(config["mongo-test-uri"]);
  });
  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it("Creates board", async () => {
    const boardData = {
      name: "b"
    };
    const board = new Board(boardData);
    await board.save();
    expect(board).toMatchObject(boardData);
  });

  it("Adds thread to the existing board", async () => {
    const board = new Board({ name: "b" });
    await board.save();
    const opPost = {
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    };
    const thread = await board.addThread(opPost);
    await thread.populateThread();
    expect(thread.opPost.postNumber).toEqual(1);
    expect(thread.opPost.authorName).toEqual("Oleg");
    expect(thread.opPost.subject).toEqual("Serious Business");
    expect(thread.opPost.content).toEqual("Hello there!");
    expect(thread.opPost.date / 10e6).toBeCloseTo(moment.now() / 10e6, 2);
    expect(thread.boardId).toEqual(board._id);
  });

  it("Creates new board, creates threads and posts in them with correct post numbers", async () => {
    const board = new Board({ name: "pr" });
    board.save();
    const thread = await board.addThread({
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    });
    const threads = await Thread.find({ boardId: board._id });
    expect(threads.length).toEqual(1);
    await thread.addPost({
      authorName: "Vasya",
      content: "How are you?"
    });
    await thread.addPost({
      authorName: "Kolya",
      content: "Fine, how are you?"
    });
    await thread.populateThread();
    expect(thread.opPost.postNumber).toEqual(1);
    expect(thread.posts[0].postNumber).toEqual(2);
    expect(thread.posts.length).toEqual(2);
    expect(thread.posts[1].postNumber).toEqual(3);
  });

  it("Creates 2 boards and their post numbers don't clash", async () => {
    const boardA = new Board({ name: "a" });
    const boardSci = new Board({ name: "sci" });
    await boardA.save();
    await boardSci.save();
    const thread1 = await boardSci.addThread({
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    });
    await thread1.populateThread();
    expect(thread1.opPost.postNumber).toEqual(1);
    const thread2 = await boardA.addThread({
      opPostAuthor: "Oleg",
      opPostSubject: "Serious Business",
      opPostContent: "Hello there!"
    });
    await thread2.populateThread();
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

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
  });
});
