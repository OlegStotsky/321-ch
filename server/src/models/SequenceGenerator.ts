import * as mongoose from "mongoose";
import { Schema, model, Model, Document } from "mongoose";

export default function sequenceGenerator(name: string) {
  const SequenceSchema = new Schema({
    nextSeqNumber: { type: Number, default: 1, unique: true }
  });

  interface ISequence extends Document {
    nextSeqNumber: number;
  }

  const Sequence = model<ISequence>(name + "Seq", SequenceSchema);

  return {
    next() {
      return new Promise(async (resolve, reject) => {
        try {
          const data: ISequence[] = await Sequence.find();
          if (data.length < 1) {
            const sequence: ISequence = await Sequence.create({});
            resolve(sequence.nextSeqNumber);
          } else {
            await Sequence.update(
              { _id: data[0]._id },
              { $inc: { nextSeqNumber: 1 } }
            );
            const newData = await Sequence.find();
            resolve(newData[0].nextSeqNumber);
          }
        } catch (e) {
          reject(e);
        }
      });
    }
  };
}
