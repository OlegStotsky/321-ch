import * as mongoose from "mongoose";
import * as moment from "moment";
import config from "../../src/config/config";
import Thread from "../../src/models/Thread";

describe("Thread", () => {
  beforeAll(() => {
    return mongoose.connect(config["mongo-test-uri"]);
  });

  it("Creates thread with op post", async () => {
    const threadData = {
      opPost: {
        date: 123,
        authorName: "abcd",
        content: "afasfasf"
      },
      board: mongoose.Types.ObjectId()
    };

    const thread = new Thread(threadData);
    const res = await thread.save();
    expect(res).toMatchObject(threadData);
  });

  it("Doesnt create thread without op post", () => {
    const threadData = {
      posts: [{date: 123,
        authorName: "abcd",
        content: "afasfasf"
      }],
      board: mongoose.Types.ObjectId()
    };
    const thread = new Thread(threadData);
    thread.save().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it("Creates thread with op post and posts", async () => {
    const threadData = {
      opPost: {
        date: 123,
        authorName: "abcd",
        content: "afasfasf"
      },
      board: mongoose.Types.ObjectId(),
      posts: [
        {
          date: 1234,
          authorName: "agfasf",
          content: "123"
        },
        {
          date: 12345,
          authorName: "agfasf",
          content: "123"
        }
      ]
    };
  });

  it("Adds post to array of posts", async () => {
    const threadData = {
      opPost: {
        date: 123,
        authorName: '"abcd',
        content: "asfasf"
      },
      board: mongoose.Types.ObjectId()
    };
    const thread = new Thread(threadData);
    await thread.save();
    const res = await thread.addPost({
      authorName: "abcd",
      content: "asfasasdf"
    });
    expect(res.posts[0].date / 10e6).toBeCloseTo(moment.now() / 10e6, 2);
    expect(res.posts[0].authorName).toMatch("abcd");
    expect(res.posts[0].content).toMatch("asfasasdf");
  });

  afterAll(() => {
    mongoose.connection.collections.threads.drop();
    mongoose.connection.close();
  });
});