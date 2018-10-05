import { Schema, model, Document, Model } from "mongoose";
import * as moment from "moment";
import * as FileService from "../services/fileService";
import { logger } from "../config/winston";

export const ThreadSchema = new Schema({
  opPost: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  opPostNumber: {
    type: Number
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true }
});
ThreadSchema.index({ boardId: 1, opPostNumber: 1 });

ThreadSchema.methods.populateThread = async function(): Promise<IThread> {
  const thread = this;
  return thread
    .populate("opPost")
    .populate("posts")
    .execPopulate();
};

ThreadSchema.methods.loadImages = async function(): Promise<IThread> {
  const thread = this;
  for (const post of thread.posts) {
    if (!post.imageName) {
      continue;
    }

    post.image = await FileService.loadPostImageFromDisk(post.imageName);
  }
  return this;
};

interface IAddPostParams {
  authorName: string;
  content: string;
  imageName: string;
}

ThreadSchema.methods.addPost = async function(
  params: IAddPostParams
): Promise<IPost> {
  const thread = this;
  const post = new Post({
    date: moment.now(),
    authorName: params.authorName,
    content: params.content,
    thread: this._id,
    imageName: params.imageName
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
  const opPost = new Post({
    date: moment.now(),
    authorName: params.authorName,
    content: params.content,
    subject: params.subject,
    thread: thread._id,
    imageName: params.imageName
  });
  await opPost.save();
  thread.opPost = opPost._id;
  thread.opPostNumber = opPost.postNumber;
  await thread.save();
  return thread;
};

export interface IThreadDocument extends Document {
  opPost: IPost;
  posts: IPost[];
  boardId: Schema.Types.ObjectId;
  opPostNumber: number;
}

export interface IThread extends IThreadDocument {
  addPost: (params: IAddPostParams) => Promise<IPost>;
  addOpPost: (params: IAddOpPostParams) => Promise<IPost>;
  populateThread: () => Promise<IThread>;
  loadImages: () => Promise<IThread>;
}

export interface IThreadModel extends Model<IThread> {}

const ThreadModel: IThreadModel = model<IThread, IThreadModel>(
  "Thread",
  ThreadSchema
);

export default ThreadModel;

import { PostSchema, IPost } from "./Post";
import Post from "./Post";
