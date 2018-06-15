import { Schema, model } from "mongoose";
import moment from "moment";

const PostSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true,
    maxlength: 30,
    minLength: 1
  },
  content: {
    type: String,
    required: true,
    maxLength: 1500
  }  
});

const PostModel = model("Post", PostSchema);

export { PostSchema, PostModel };