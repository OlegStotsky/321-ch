import { Schema, model, Document, Model } from "mongoose";
import { PostSchema, IPost } from "./Post";
import * as moment from "moment";

export const ThreadSchema = new Schema({
  opPost: {
    type: PostSchema,
    required: true
  },
  posts: [ PostSchema ],
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true }
});

interface IAddPostParams {
  authorName: string,
  content: string
}

ThreadSchema.methods.addPost = function(params: IAddPostParams) {
  const thread = this;
  const post = {
    date: moment.now(),
    authorName: params.authorName,
    content: params.content
  };
  thread.posts.push(post);
  return thread.save();
}

export interface IThreadDocument extends Document {
  opPost: IPost,
  posts?: IPost[],
  board: Schema.Types.ObjectId
}

export interface IThread extends IThreadDocument {
  addPost: (params: IAddPostParams) => IThreadDocument;
}

export interface IThreadModel extends Model<IThread> {
}

const ThreadModel: IThreadModel = model<IThread, IThreadModel>("Thread", ThreadSchema);

export default ThreadModel;