import * as mongoose from "mongoose";
import * as moment from "moment";
import config from "../../src/config/config";
import Thread from "../../src/models/Thread";
import BoardName from "../../../shared/lib/types/BoardName";
import Board from "../../src/models/Board";

describe("Thread", async () => {
  let board;

  beforeAll(async () => {
    await mongoose.connect(config["mongo-test-uri"]);
  });
  beforeEach(async () => {
    board = await Board.create({ name: "b" });
  });
  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it("Creates thread with op post", async () => {
    const threadData = {
      boardId: board._id
    };
    const opPost = {
      authorName: "abcd",
      content: "afasfasf",
      subject: "some subject"
    };

    const thread = new Thread(threadData);
    await thread.save();
    await thread.addOpPost(opPost);
    await thread.populateThread();
    expect(thread.boardId).toEqual(threadData.boardId);
    expect(thread.opPost).toMatchObject(opPost);
  });

  it("Creates thread with op post and posts", async () => {
    const threadData = {
      boardId: board._id
    };
    const post1 = {
      authorName: "agfasf",
      content: "123"
    };
    const post2 = {
      authorName: "agfasf",
      content: "123"
    };
    const opPost = {
      authorName: "op",
      content: "hello there",
      subject: "hey guys"
    };
    const thread = new Thread(threadData);
    await thread.save();
    await thread.addOpPost(opPost);
    await thread.addPost(post1);
    await thread.addPost(post2);
    await thread.populateThread();
    expect(thread.boardId).toEqual(threadData.boardId);
    expect(thread.opPost).toMatchObject(opPost);
    expect(thread.posts[0]).toMatchObject(post1);
    expect(thread.posts[1]).toMatchObject(post2);
  });

  it("Adds post to array of posts", async () => {
    const threadData = {
      boardId: board._id
    };
    const opPost = {
      authorName: '"abcd',
      content: "asfasf",
      subject: "lolz"
    };
    const thread = new Thread(threadData);
    await thread.save();
    await thread.addOpPost(opPost);
    await thread.addPost({
      authorName: "abcd",
      content: "asfasasdf"
    });
    await thread.populateThread();
    expect(thread.posts[0].date / 10e6).toBeCloseTo(moment.now() / 10e6, 2);
    expect(thread.posts[0].authorName).toMatch("abcd");
    expect(thread.posts[0].content).toMatch("asfasasdf");
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
  });
});
