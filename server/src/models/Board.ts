import { Schema, model } from "mongoose";
import { ThreadSchema } from "./Thread";

const BoardSchema = new Schema({
  name: String,
  threads: [ ThreadSchema ]
});

const BoardModel = model("Board", BoardSchema);

export { BoardSchema, BoardModel };