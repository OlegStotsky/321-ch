import { writeFile, readFile } from "fs-promise";
import * as path from "path";
import config from "../config/config";

const staticFolderPath = (subPath: string) => {
  return path.join(config.STATIC_FOLDER_PATH, subPath);
};

const savePostImageToDisk = (fileName: string, data: string): Promise<void> => {
  return saveBase64ToDisk(config.STATIC_FOLDER, fileName, data);
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
