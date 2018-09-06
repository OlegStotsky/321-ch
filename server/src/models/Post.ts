import { Schema, model, Document } from "mongoose";
import * as moment from "moment";
import * as mongoose from "mongoose";

export const PostSchema = new Schema({
  date: {
    type: Number,
    required: true
  },
  authorName: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 1
  },
  content: {
    type: String,
    required: true,
    maxLength: 1500
  },
  subject: {
    type: String
  },
  postNumber: {
    type: Number
  },
  thread: { type: Schema.Types.ObjectId, required: true }
});

PostSchema.pre("save", async function(next) {
  const post: any = this;
  const thread: any = await Thread.findById(post.thread);
  const board: any = await Board.findById(thread.boardId);
  post.postNumber = board.lastPostNumber;
  board.lastPostNumber++;
  board.save();
  next();
});

export interface IPostDocument extends Document {
  date: number;
  authorName: string;
  content: string;
  subject?: string;
  postNumber: number;
}

export interface IPost extends IPostDocument {}

const PostModel = model<IPost>("Post", PostSchema);

export default PostModel;

import Thread from "./Thread";
import Board from "./Board";
