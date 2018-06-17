import { Schema, model, Document, Model } from "mongoose";
import { ThreadSchema, IThread, IThreadDocument } from "./Thread";
import Thread from "./Thread";
import { IPost } from "./Post";
import * as moment from "moment";

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  threads: [ThreadSchema]
});

interface IAddThreadParams {
  opPostAuthor: string;
  opPostSubject: string;
  opPostContent: string;
}

BoardSchema.methods.addThread = async function(params: IAddThreadParams) {
  const threadData = {
    board: this.name
  };
  const thread = new Thread(threadData);
  await thread.addOpPost({
    authorName: params.opPostAuthor,
    subject: params.opPostSubject,
    content: params.opPostContent
  });
  this.threads.push(thread);
  await this.save();
  return thread;
};

export interface IBoardDocument extends Document {
  name: string;
  threads: IThread[];
}

export interface IBoard extends IBoardDocument {
  addThread: (opPost: IAddThreadParams) => IThread;
}

export interface IBoardModel extends Model<IBoard> {}

const BoardModel: IBoardModel = model<IBoard, IBoardModel>(
  "Board",
  BoardSchema
);
export default BoardModel;
