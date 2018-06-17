import Post from "../../src/models/Post";
import * as mongoose from "mongoose";
import config from "../../src/config/config";

describe("Post", () => {
  beforeAll(() => {
    return mongoose.connect(config["mongo-test-uri"]);
  });

  it("Successfuly creates valid post", () => {
    const postData = {
      date: 12.5,
      authorName: "Anonymous",
      content: "abcd",
      postNumber: 1
    };
    const post = new Post(postData);
    post.save().then(res => {
      expect(res).toMatchObject(postData);
    });
  });

  it("Reads post from the db", () => {
    Post.findOne({ content: "abcd" }).then(post => {
      if (!post) {
        throw new Error("couldn't find post that should exist")
      }
      expect(post).toMatchObject({
        date: 12.5,
        authorName: "Anonymous",
        content: "abcd"
      });
    });
  });

  it("Rejects post with authorName of length less than 1", () => {
    const postData = {
      date: 12.5,
      authorName: "",
      content: "abcd",
      postNumber: 1
    };
    const post = new Post(postData);
    post.save().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it("Rejects post without date", () => {
    const postData = {
      authorName: "a",
      content: "abcd",
      postNumber: 1
    };
    const post = new Post(postData);
    post.save().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it("Rejects post without authorName", () => {
    const postData = {
      date: 12.5,
      content: "abcd",
      postNumber: 1
    };
    const post = new Post(postData);
    post.save().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it("Rejects post without content", () => {
    const postData = {
      date: 12.5,
      authorName: "abcd",
      postNumber: 1
    };
    const post = new Post(postData);
    post.save().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  afterAll(async () => {
    await mongoose.connection.collections.posts.drop();
  });
});
