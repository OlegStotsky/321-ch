import { Schema, model, Document, Model } from "mongoose";
import { ThreadSchema, IThread, IThreadDocument } from "./Thread";
import { IPost } from "./Post";
import * as moment from "moment";

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  threads: [ ThreadSchema ]
});

interface IAddThreadParams {
  opPostAuthor: string;
  opPostSubject: string;
  opPostContent: string;
}

BoardSchema.methods.addThread = function(params: IAddThreadParams) {
  const thread = {
    opPost: {
      date: moment.now(),
      authorName: params.opPostAuthor,
      content: params.opPostContent,
      subject: params.opPostSubject
    },
    board: this._id    
  };
  this.threads.push(thread);
  return this.save();
}

export interface IBoardDocument extends Document {
  name: string,
  threads: IThread[]
}

export interface IBoard extends IBoardDocument {
  addThread: (opPost: IAddThreadParams)=> IBoardDocument;
}

export interface IBoardModel extends Model<IBoard> {

}

const BoardModel: IBoardModel = model<IBoard, IBoardModel>("Board", BoardSchema);
export default BoardModel;