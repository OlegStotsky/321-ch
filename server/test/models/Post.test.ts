import Post from "../../src/models/Post";
import * as mongoose from "mongoose";
import config from "../../src/config/config";

describe("Post", () => {
  beforeAll(() => {
    return mongoose.connect(config["mongo-test-uri"]);
  });

  it("Successfuly creates valid post", () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  });

  it("Reads post from the db", () => {
    try {
      Post.findOne({ content: "abcd" }).then(post => {
        expect(post).toMatchObject({
          date: 12.5,
          authorName: "Anonymous",
          content: "abcd"
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  it("Rejects post with authorName of length less than 1", () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  });

  it("Rejects post without date", () => {
    try {
      const postData = {
        authorName: "a",
        content: "abcd",
        postNumber: 1
      };
      const post = new Post(postData);
      post.save().catch(e => {
        expect(e).toBeTruthy();
      });
    } catch (e) {
      console.log(e);
    }
  });

  it("Rejects post without authorName", () => {
    try {
      const postData = {
        date: 12.5,
        content: "abcd",
        postNumber: 1
      };
      const post = new Post(postData);
      post.save().catch(e => {
        expect(e).toBeTruthy();
      });
    } catch (e) {
      console.log(e);
    }
  });

  it("Rejects post without content", () => {
    try {
      const postData = {
        date: 12.5,
        authorName: "abcd",
        postNumber: 1
      };
      const post = new Post(postData);
      post.save().catch(e => {
        expect(e).toBeTruthy();
      });
    } catch (e) {
      console.log(e);
    }
  });

  afterAll(async () => {
    await mongoose.connection.collections.posts.drop();
  });
});
