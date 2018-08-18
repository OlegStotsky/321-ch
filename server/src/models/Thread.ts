import { Schema, model, Document, Model } from "mongoose";
import { PostSchema, IPost } from "./Post";
import * as moment from "moment";
import SequenceManager from "../lib/SequenceManager";

export const ThreadSchema = new Schema({
  opPost: {
    type: PostSchema,
    required: true
  },
  posts: [PostSchema],
  board: { type: String, required: true }
});

interface IAddPostParams {
  authorName: string;
  content: string;
}

ThreadSchema.methods.addPost = async function(params: IAddPostParams) {
  const thread = this;
  const postNumber = await SequenceManager.getInstance().next(this.board);
  const post = {
    date: moment.now(),
    authorName: params.authorName,
    content: params.content,
    postNumber
  };
  thread.posts.push(post);
  return post;
};

interface IAddOpPostParams extends IAddPostParams {
  subject: string;
}

ThreadSchema.methods.addOpPost = async function(params: IAddOpPostParams) {
  const thread = this;
  const postNumber = await SequenceManager.getInstance().next(this.board);
  thread.opPost = {
    date: moment.now(),
    authorName: params.authorName,
    content: params.content,
    subject: params.subject,
    postNumber
  };
  return thread;
};

export interface IThreadDocument extends Document {
  opPost: IPost;
  posts: IPost[];
  board: Schema.Types.ObjectId;
}

export interface IThread extends IThreadDocument {
  addPost: (params: IAddPostParams) => IPost;
  addOpPost: (params: IAddOpPostParams) => IPost;
}

export interface IThreadModel extends Model<IThread> {}

const ThreadModel: IThreadModel = model<IThread, IThreadModel>(
  "Thread",
  ThreadSchema
);

export default ThreadModel;
