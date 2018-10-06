import { IPostDocument } from "../models/Post";
import * as R from "ramda";
import { IThreadDocument } from "../models/Thread";
import * as path from "path";

export const pickValuesFromPost = (post: IPostDocument) => {
  return R.pick(
    ["date", "authorName", "content", "subject", "postNumber", "imageUri"],
    post
  );
};

export const pickValuesfromThread = (thread: IThreadDocument) => {
  return R.evolve(
    { opPost: pickValuesFromPost, posts: R.map(pickValuesFromPost) },
    R.pick(["posts", "opPost", "opPostNumber"], thread)
  );
};
