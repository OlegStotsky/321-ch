import { IPostDocument } from "../models/Post";
import * as R from "ramda";
import { IThreadDocument } from "../models/Thread";
import { writeFile } from "fs-promise";
import * as path from "path";

export const pickValuesFromPost = (post: IPostDocument) => {
  return R.pick(
    ["date", "authorName", "content", "subject", "postNumber"],
    post
  );
};

export const pickValuesfromThread = (thread: IThreadDocument) => {
  return R.evolve(
    { opPost: pickValuesFromPost, posts: R.map(pickValuesFromPost) },
    R.pick(["posts", "opPost", "opPostNumber"], thread)
  );
};

export const saveBase64ToDisk = (
  dir: string,
  fileName: string,
  data: string
) => {
  const img = data.replace(/^data:image\/\w+;base64,/, "");
  const buf = new Buffer(img, "base64");
  return writeFile(path.join(dir, fileName), buf);
};
