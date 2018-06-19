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

BoardSchema.methods.addThread = async function(
  params: IAddThreadParams
): Promise<IThread> {
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
  return this.save().then(() => thread);
};

BoardSchema.methods.findThreadByOpPostNumber = async function(
  opPostNumber: number
): Promise<IThread> {
  return (this.threads as IThread[]).find(
    thread => thread.opPost.postNumber === opPostNumber
  );
};

export interface IBoardDocument extends Document {
  name: string;
  threads: IThread[];
}

export interface IBoard extends IBoardDocument {
  addThread: (opPost: IAddThreadParams) => Promise<IThread>;
  findThreadByOpPostNumber: (opPostNumber: number) => Promise<IThread>;
}

export interface IBoardModel extends Model<IBoard> {}

const BoardModel: IBoardModel = model<IBoard, IBoardModel>(
  "Board",
  BoardSchema
);
export default BoardModel;
