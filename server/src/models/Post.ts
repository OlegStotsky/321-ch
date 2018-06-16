import { Schema, model, Document } from "mongoose";
import * as moment from "moment";

const PostSchema = new Schema({
  date: {
    type: Number,
    required: true,
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
  }
});

export interface IPost extends Document {
  date: number,
  authorName: string,
  content: string,
  subject?: string
}

const PostModel = model<IPost>("Post", PostSchema);

export { PostSchema, PostModel as default };