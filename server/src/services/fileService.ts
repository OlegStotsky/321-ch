import { writeFile, readFile } from "fs-promise";
import * as path from "path";
import config from "../config/config";

const staticFolderPath = (subPath: string) => {
  return path.join(config.STATIC_FOLDER_PATH, subPath);
};

const getTypeFromDataString = (dataString: string) => {
  return dataString.match(/^data:image\/(\w+);base64/)[1];
};

const savePostImageToDisk = async (
  fileName: string,
  data: string
): Promise<string> => {
  await saveBase64ToDisk(config.STATIC_FOLDER, fileName, data);
  return "images/" + fileName;
};

const saveBase64ToDisk = (
  dir: string,
  fileName: string,
  data: string
): Promise<void> => {
  const img = data.replace(/^data:image\/\w+;base64,/, "");
  const buf = new Buffer(img, "base64");
  return writeFile(staticFolderPath(fileName), buf);
};

const loadPostImageFromDisk = (fileName: string): Promise<string> => {
  return readFile(staticFolderPath(fileName), "base64");
};

export { savePostImageToDisk, loadPostImageFromDisk, staticFolderPath };
