import * as path from "path";

export default {
  "mongo-uri": process.env.MONGODB_URI || "mongodb://localhost:27017/321ch",
  "mongo-test-uri":
    process.env.MONGODB_URI || "mongodb://localhost:27017/321ch-test",
  STATIC_FOLDER: "static",
  STATIC_FOLDER_PATH: path.join(__dirname, "..", "..", "static")
};
