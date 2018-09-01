import { Schema, model, Document, Model } from "mongoose";
import * as moment from "moment";

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  lastPostNumber: {
    type: Number,
    required: true,
    default: 1
  }
});

BoardSchema.index({ name: 1 });

interface IAddThreadParams {
  opPostAuthor: string;
  opPostSubject: string;
  opPostContent: string;
}

BoardSchema.methods.addThread = async function(
  params: IAddThreadParams
): Promise<IThread> {
  const board = this;
  const threadData = {
    boardId: board._id
  };
  const thread = new Thread(threadData);
  await thread.save();
  await thread.addOpPost({
    authorName: params.opPostAuthor,
    subject: params.opPostSubject,
    content: params.opPostContent
  });
  return thread;
};

export interface IBoardDocument extends Document {
  name: string;
  threads: IThread[];
}

export interface IBoard extends IBoardDocument {
  addThread: (opPost: IAddThreadParams) => Promise<IThread>;
}

export interface IBoardModel extends Model<IBoard> {}

const BoardModel: IBoardModel = model<IBoard, IBoardModel>(
  "Board",
  BoardSchema
);
export default BoardModel;

import { ThreadSchema, IThread, IThreadDocument } from "./Thread";
import Thread from "./Thread";
import { IPost } from "./Post";
