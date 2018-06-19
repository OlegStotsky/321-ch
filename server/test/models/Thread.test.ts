import * as mongoose from "mongoose";
import * as moment from "moment";
import config from "../../src/config/config";
import Thread from "../../src/models/Thread";

describe("Thread", () => {
  const boardName = "b";
  beforeAll(() => {
    return mongoose.connect(config["mongo-test-uri"]);
  });

  it("Creates thread with op post", async () => {
    const threadData = {
      board: boardName
    };
    const opPost = {
      authorName: "abcd",
      content: "afasfasf",
      subject: "some subject"
    };

    const thread = new Thread(threadData);
    await thread.addOpPost(opPost);
    const res = await thread.save();
    expect(res.board).toEqual(threadData.board);
    expect(res.opPost).toMatchObject(opPost);
  });

  it("Doesnt create thread without op post", () => {
    const threadData = {
      posts: [
        {
          date: 123,
          authorName: "abcd",
          content: "afasfasf",
          postNumber: 1
        }
      ],
      board: boardName
    };
    const thread = new Thread(threadData);
    thread.save().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it("Creates thread with op post and posts", async () => {
    const threadData = {
      board: boardName
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
    await thread.addOpPost(opPost);
    await thread.addPost(post1);
    await thread.addPost(post2);
    const res = await thread.save();
    expect(res.board).toEqual(threadData.board);
    expect(res.opPost).toMatchObject(opPost);
    expect(res.posts[0]).toMatchObject(post1);
    expect(res.posts[1]).toMatchObject(post2);
  });

  it("Adds post to array of posts", async () => {
    const threadData = {
      board: boardName
    };
    const opPost = {
      authorName: '"abcd',
      content: "asfasf",
      subject: "lolz"
    };
    const thread = new Thread(threadData);
    await thread.addOpPost(opPost);
    await thread.save();
    await thread.addPost({
      authorName: "abcd",
      content: "asfasasdf"
    });
    expect(thread.posts[0].date / 10e6).toBeCloseTo(moment.now() / 10e6, 2);
    expect(thread.posts[0].authorName).toMatch("abcd");
    expect(thread.posts[0].content).toMatch("asfasasdf");
  });

  afterAll(async () => {
    await mongoose.connection.collections.threads.drop();
    const keys = Object.keys(mongoose.connection.collections);
    for (const key of keys) {
      if (key.match(/^.*seqs$/)) {
        await mongoose.connection.collections[key].drop();
      }
    }
    mongoose.disconnect();
  });
});
