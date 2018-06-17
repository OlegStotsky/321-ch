import * as mongoose from "mongoose";
import SequenceGenerator from "../../src/models/SequenceGenerator";
import config from "../../src/config/config";

describe("Seqeunce Generator", () => {
  let seq;
  beforeAll(async () => {
    seq = SequenceGenerator("abcd");
    return mongoose.connect(config["mongo-test-uri"]);
  });
  it("Creates sequence generator with default 1", async () => {
    const nextNum = await seq.next();
    expect(nextNum).toEqual(1);
  });
  it("Increments properly", async () => {
    const nextNum = await seq.next();
    expect(nextNum).toEqual(2);
  });
  it("Increments properly once again", async () => {
    const nextNum = await seq.next();
    expect(nextNum).toEqual(3);
  });

  afterAll(() => {});
});
