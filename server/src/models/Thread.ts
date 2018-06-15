/*
  Primary key - id, sequential, int
  Array of posts - First post in The array is op post
*/

import { Schema, model } from "mongoose";
import { PostSchema } from "./Post";

const ThreadSchema = new Schema({
  posts: [ PostSchema ]
});

const ThreadModel = model("Thread", ThreadSchema);

export { ThreadSchema, ThreadModel as default};