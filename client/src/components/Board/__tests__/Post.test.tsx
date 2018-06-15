/*
  x Should display date of the post
  x Should display time of the post
  x Should display post number tied to a current board
  x Should display name of the post author
  x Should display post content
*/

import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as moment from "moment";
import Post from "../Post";

Enzyme.configure({ adapter: new Adapter() });

describe("Post", () => {
  const date = moment("2018-06-15 09:30:26");
  const postNumber = 123;
  let post;
  const postAuthor = "Oleg";
  const postContent = "hello world!";
  beforeEach(() => {
    post = Enzyme.mount(
      <Post
        date={date}
        postNumber={postNumber}
        authorName={postAuthor}
        content={postContent}
      />
    );
  });

  describe("header", () => {
    it("has date of the post", () => {
      expect(post.find(".post__header").text()).toContain("15/06/18");
    });
    it("has the time of the post", () => {
      expect(post.find(".post__header").text()).toContain("09:30:26");
    });
    it("has the number of the post", () => {
      expect(post.find(".post__header").text()).toContain(`No. ${postNumber}`);
    });
    it("has the author name of the post", () => {
      expect(post.find(".post__header").text()).toContain("Oleg");
    });
  });

  describe("body", () => {
    it("has the content of the post", () => {
      expect(post.find(".post__body").text()).toContain("hello world!");
    });
  });
});
