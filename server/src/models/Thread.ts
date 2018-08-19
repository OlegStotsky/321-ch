import { Schema, model, Document, Model } from "mongoose";
import { PostSchema, IPost } from "./Post";
import Post from "./Post";
import * as moment from "moment";
import SequenceManager from "../lib/SequenceManager";

export const ThreadSchema = new Schema({
  opPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  board: { type: String, required: true }
});

interface IAddPostParams {
  authorName: string;
  content: string;
}

ThreadSchema.methods.addPost = async function(
  params: IAddPostParams
): Promise<IPost> {
  const thread = this;
  const postNumber = await SequenceManager.getInstance().next(this.board);
  const post = new Post({
    date: moment.now(),
    authorName: params.authorName,
    content: params.content,
    postNumber
  });
  await post.save();
  thread.posts.push(post._id);
  await thread.save();
  return post;
};

interface IAddOpPostParams extends IAddPostParams {
  subject: string;
}

ThreadSchema.methods.addOpPost = async function(
  params: IAddOpPostParams
): Promise<IPost> {
  const thread = this;
  const postNumber = await SequenceManager.getInstance().next(this.board);
  const opPost = new Post({
    date: moment.now(),
    authorName: params.authorName,
    content: params.content,
    subject: params.subject,
    postNumber
  });
  await opPost.save();
  thread.opPost = opPost._id;
  await thread.save();
  return thread;
};

export interface IThreadDocument extends Document {
  opPost: IPost;
  posts: IPost[];
  board: Schema.Types.ObjectId;
}

export interface IThread extends IThreadDocument {
  addPost: (params: IAddPostParams) => Promise<IPost>;
  addOpPost: (params: IAddOpPostParams) => Promise<IPost>;
}

export interface IThreadModel extends Model<IThread> {}

const ThreadModel: IThreadModel = model<IThread, IThreadModel>(
  "Thread",
  ThreadSchema
);

export default ThreadModel;
