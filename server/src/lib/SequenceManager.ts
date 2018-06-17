import * as mongoose from "mongoose";
import BoardName from "../../../shared/lib/types/BoardName";
import Sequence from "../models/Sequence";

class SequenceManager {
  public static getInstance() {
    return this.instance || ( this.instance = new this() );
  }
  private static instance : SequenceManager;
  public generators: Map<string, any> = new Map<string, any>();
  private constructor() {}

  public async next(boardName: string) {
    if (!(Object as any).values(BoardName).includes(boardName)) {
      throw new Error("Board doesn't exist");
    }

    if (!this.generators.get(boardName)) {
      this.generators.set(boardName, Sequence(boardName));
    }

    return this.generators.get(boardName).next();
  }
}

export default SequenceManager;