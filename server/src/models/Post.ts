import { Schema, model, Document } from "mongoose";
import * as moment from "moment";

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
    type: Number,
    required: true
  }
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
